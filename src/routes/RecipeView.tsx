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
    const [showModal, setShowModal] = useState(false);
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
                setError('Failed to load recipe');
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
    }, [id]);

    const openModal = () => {
        console.log("Opening modal");
        setShowModal(true);
    };
    const closeModal = () => setShowModal(false);

    async function deleteRecipe() {
        closeModal();
        try {
            const response = await fetch(`http://localhost:3000/recipes/delete${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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

    if (!recipe) return <div>Loading...</div>;

    const canEdit = currentUser && (currentUser.id === recipe.user_id || ['manager', 'admin'].includes(currentUser.role));
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
                                        <button className="btn btn-danger w-100 mt-2" onClick={openModal}>Delete This Recipe</button>
                                    </>

                                )}
                            </div>
                            {showModal && (
                                <>
                                    <div
                                        className="modal fade show"
                                        id="exampleModal"
                                        tabIndex={-1}
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                        Are you sure?
                                                    </h1>
                                                </div>
                                                <div className="modal-body">Do you indeed want to delete this recipe? This cannot be undone.</div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-bs-dismiss="modal"
                                                        onClick={closeModal}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-danger" onClick={deleteRecipe}>
                                                        Delete The Recipe
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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