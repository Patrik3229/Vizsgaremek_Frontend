import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import '../css/RecipeView.scoped.css';
import { useContext, useEffect, useState } from "react";
import { TopRecipes } from "../Components/TopRecipes";
import { ApiContext } from "../api";

export default function RecipeView() {

    const { id } = useParams(); // This will extract `id` from the URL
    const [recipe, setRecipe] = useState<Recipe>(null); // This will hold our fetched recipe
    const [allergens, setAllergens] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { currentUser, token } = useContext(ApiContext);

    interface Recipe {
        id: number;
        user_id: number;
        username: string;
        title: string;
        preptime: number;
        description: string;
        content: string;
        allergen_ids: string[];
    }

    useEffect(() => {
        setLoading(true);
        async function fetchRecipe() {
            try {
                const response = await fetch(`http://localhost:3000/recipes/find${id}`);
                const data = await response.json();
                setRecipe(data); // Set the fetched recipe into state

                const allergensResponse = await fetch(`http://localhost:3000/allergens/find-recipe/${id}`);
                const allergensData = await allergensResponse.json();
                setAllergens(allergensData);

                setLoading(false);
            } catch (error) {

                console.error('Failed to fetch recipe:', error);
                setError('Failed to load profile');
                localStorage.setItem('recipeNotFound', 'Recipe not found.');
                setLoading(false);
                navigate('/');
            }
        };

        async function fetchRatings() {
            try {
                const response = await fetch(`http://localhost:3000/ratings/getAll`);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch ratings:', error);
            }
        }

        

        fetchRecipe();
        fetchRatings();
    }, [id]); // This effect will re-run whenever the `id` changes

    async function deleteRecipe() {
        try {
            const data = {
                id: recipe.id
            };
            const response = await fetch(`http://localhost:3000/recipes/delete${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json(); // Assuming the server responds with JSON
            if (response.ok) {
                console.log('Recipe deleted successfully:', result);
                navigate('/'); // Redirect or update UI accordingly
            } else {
                throw new Error(result.message || 'Failed to delete the recipe');
            }
        } catch (error) {
            console.error('Failed to delete recipe:', error);
        }
    }

    // Handling loading state or no data found
    if (!recipe) return <div>Loading...</div>;

    const canEdit = currentUser && (currentUser.id === recipe.user_id || ['manager', 'admin'].includes(currentUser.role));
    console.log(`Recipe: ${recipe.id}`);

    const allergenNames = allergens.map(a => a.name).join(', ');

    return <>
        <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
            <div className="row" style={{ height: '100vh' }}>
                <div className="col-2" style={{ height: '100vh' }}>
                    <Sidebar />
                </div>
                <div className="col-10" id="middle">
                    <div className="row">
                        <div className="col-9" id="recipeview">
                            <h1 className="mb-4">{recipe.title}</h1>
                            <h5 className="mb-5">{recipe.description}</h5>
                            <h5>Author: {recipe.username}</h5>
                            <h5>Preparation time: {recipe.preptime} minutes</h5>
                            <h5>Allergens: {allergenNames || 'None'}</h5>
                            <div id="content">
                                {recipe.content}
                            </div>
                            <div>
                                {canEdit && (
                                    <>
                                        <button className="btn btn-primary w-100 mt-5" onClick={() => navigate(`/edit-recipe/${id}`)}>Edit This Recipe</button>
                                        <button className="btn btn-danger w-100 mt-2" onClick={deleteRecipe}>Delete This Recipe</button>
                                    </>

                                )}
                            </div>
                            <hr style={{ margin: '30px 0px 30px 0px' }} />
                            <h3>Reviews</h3>
                        </div>
                        <div className="col-3">
                            <TopRecipes />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}