import { useEffect, useState } from 'react';
import { Search } from '../Components/Search';
import { useSearchResults } from '../Components/SearchContext';
import { Sidebar } from '../Components/Sidebar';
import { TopRecipes } from '../Components/TopRecipes';
import '../css/Root.scoped.css';
import '../css/SearchResults.scoped.css';
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {
    const { searchResults } = useSearchResults();

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, _setItemsPerPage] = useState(3);
    const [allergenIdsByRecipe, setAllergenIdsByRecipe] = useState<AllergenIdsByRecipe>({});

    const navigate = useNavigate();

    useEffect(() => {
        const loadAllergens = async () => {
            const allergenMap: AllergenIdsByRecipe = {};
            for (const recipe of searchResults) {
                allergenMap[recipe.id] = await fetchAllergensForRecipe(recipe.id);
            }
            setAllergenIdsByRecipe(allergenMap);
        };
        if (searchResults.length) {
            loadAllergens();
        }
    }, [searchResults]);

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const currentRecipes = searchResults.slice(startIndex, startIndex + itemsPerPage);

    const allergens: Allergen[] = [
        { id: 1, name: 'Gluten' },
        { id: 2, name: 'Crustaceans' },
        { id: 3, name: 'Eggs' },
        { id: 4, name: 'Fish' },
        { id: 5, name: 'Peanuts' },
        { id: 6, name: 'Soybeans' },
        { id: 7, name: 'Milk' },
        { id: 8, name: 'Nuts' },
        { id: 9, name: 'Celery' },
        { id: 10, name: 'Mustard' },
        { id: 11, name: 'Sesame seeds' },
        { id: 12, name: 'Sulphur dioxide' },
        { id: 13, name: 'Lupin' },
        { id: 14, name: 'Molluscs' },
    ];

    interface Allergen {
        id: number;
        name: string;
    }
    
    interface AllergenIdsByRecipe {
        [key: number]: string;
    }
    
    interface AllergenObject {
        name: string;
    }

    const handleNavigation = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const goToRecipe = (recipeId: number) => {
        navigate(`/recipe/${recipeId}`); // Adjust the path as per your routing setup
    };

    async function fetchAllergensForRecipe(recipeId: number): Promise<string> {
        try {
            const response = await fetch(`http://localhost:3000/allergens/find-recipe/${recipeId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch allergens');
            }
            const allergenObjects: AllergenObject[] = await response.json(); // Assuming the response is an array of objects like { name: "Lupin" }
            console.log("Fetched allergens for recipe " + recipeId + ":", allergenObjects);

            const allergenIds = allergenObjects.map(obj => {
                const allergenName = obj.name; // Accessing the name property
                const foundAllergen = allergens.find(allergen => allergen.name === allergenName);
                if (!foundAllergen) {
                    console.log("Allergen not found for name:", allergenName);
                    return 'Unknown';
                }
                return foundAllergen.id;
            }).sort((a, b) => {
                if (a === 'Unknown') return 1;
                if (b === 'Unknown') return -1;
                return a - b;
            });
            return allergenIds.join(', '); // Join IDs into a string for display
        } catch (error) {
            console.error('Error fetching allergens:', error);
            return 'Error';
        }
    }

    return <>
        <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
            <div className="row" style={{ height: '100vh' }}>
                <div className="col-2" style={{ height: '100vh' }}>
                    <Sidebar />
                </div>
                <div className="col-8" id='search' style={{ padding: '20px 50px 50px 50px' }}>
                    <Search />
                    {currentRecipes.map((recipe, index) => {
                        return (
                            <div className="card w-100 mb-3" key={index} style={{ cursor: "pointer" }} onClick={() => goToRecipe(recipe.id)}>
                                <div className="card-body">
                                    <div className="spbw row mb-2">
                                        <h5 className="card-title col-10">{recipe.title}</h5>
                                        <h5 className="card-title col-2 text-end">{recipe.preptime} minutes</h5>
                                    </div>
                                    <p id="recipeDescription" className="card-subtitle mb-5">{recipe.description}</p>
                                    <div className="spbw">
                                        <span>Allergens: {allergenIdsByRecipe[recipe.id]}</span>
                                        <span><span className="fa fa-solid fa-star"></span> {recipe.rating} / 5</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="d-flex justify-content-center">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handleNavigation(0); }}>First</a>
                            </li>
                            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handleNavigation(currentPage - 1); }}>Previous</a>
                            </li>
                            <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handleNavigation(currentPage + 1); }}>Next</a>
                            </li>
                            <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handleNavigation(totalPages - 1); }}>Last</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-2">
                    <TopRecipes />
                </div>
            </div>
        </div>
    </>
}