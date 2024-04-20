import { useEffect, useState } from 'react';
import { Search } from '../Components/Search';
import { useSearchResults } from '../Components/SearchContext';
import { Sidebar } from '../Components/Sidebar';
import { TopRecipes } from '../Components/TopRecipes';
import '../css/Root.scoped.css';
import '../css/SearchResults.scoped.css';
import { useNavigate } from 'react-router-dom';
import allergens from '../allergens';

/**
 * Kártyákat használva megjeleníti a keresési eredményeket.
 * @returns A keresési eredményeket.
 */
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
    
    interface AllergenIdsByRecipe {
        [key: number]: string;
    }
    
    interface AllergenObject {
        name: string;
    }

    /**
     * A paginationt beállítja a megfelelő oldalra.
     * @param newPage Az új oldalszám.
     */
    const handleNavigation = (newPage: number) => {
        setCurrentPage(newPage);
    }

    /**
     * Egy specifikus receptre történő navigálás.
     * @param recipeId A recept azonosítója, amire navigálni kell.
     */
    const goToRecipe = (recipeId: number) => {
        navigate(`/recipe/${recipeId}`);
    };

    /**
     * Egy adott recept allergénjeinek lekérdezését végző függvény.
     * @param recipeId A recept azonosítója, aminek az allergén adatait lekérdezzük.
     * @returns String formátumban az allergének azonosítóját.
     */
    async function fetchAllergensForRecipe(recipeId: number): Promise<string> {
        try {
            const response = await fetch(`http://localhost:3000/allergens/find-recipe/${recipeId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch allergens');
            }
            const allergenObjects: AllergenObject[] = await response.json();
            console.log("Fetched allergens for recipe " + recipeId + ":", allergenObjects);

            const allergenIds = allergenObjects.map(obj => {
                const allergenName = obj.name;
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
            return allergenIds.join(', ');
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