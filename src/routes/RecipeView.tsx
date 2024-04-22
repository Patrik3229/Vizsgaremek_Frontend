import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import '../css/RecipeView.scoped.css';
import { useContext, useEffect, useState } from "react";
import { TopRecipes } from "../Components/TopRecipes";
import { ApiContext } from "../api";
import { Ratings } from "../Components/Ratings";

/**
 * Lekéri az adott recept adatait és visszaadja azt szerkesztési és törlési opcióval, amennyiben ehhez a felhasználónak joga van.
 * @returns A recept adatait, illetve, ha alkalmazható, módosítási és törlési lehetőséget.
 */
export default function RecipeView() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [allergens, setAllergens] = useState<Allergen[]>([]);
    const [_error, setError] = useState('');
    const [_loading, setLoading] = useState(true);
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

    interface Allergen {
        id: number;
        name: string;
    }

    useEffect(() => {
        setLoading(true);

        /**
         * Lekéri a recept adatait és a hozzá tartozó allergéneket.
         */
        async function fetchRecipe() {
            try {
                const response = await fetch(`http://localhost:3000/recipes/find${id}`);
                const data = await response.json();
                setRecipe(data);

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

        fetchRecipe();
    }, [id]);

    /**
     * Megnyitja a modalt, ahol meg kell erősíteni, ha egy receptet törölni szeretnénk.
     */
    const openModal = () => {
        console.log("Opening modal");
        setShowModal(true);
    };

    /**
     * Bezárja a modalt, ami a recept törlésének megerősítésére szolgál.
     */
    const closeModal = () => setShowModal(false);

    /**
     * A recept törlésének a logikája.
     */
    async function deleteRecipe() {
        closeModal();
        try {
            const deleteEndpoint = ['admin', 'manager'].includes(currentUser.role)
                ? `http://localhost:3000/recipes/delete-admin/${id}`
                : `http://localhost:3000/recipes/delete${id}`;

            const response = await fetch(deleteEndpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Recipe deleted successfully:', result);
                navigate('/');
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
                                <div className="modal fade show" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5">
                                                    Are you sure?
                                                </h1>
                                            </div>
                                            <div className="modal-body">Do you indeed want to delete this recipe? This cannot be undone.</div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                                <button type="button" className="btn btn-danger" onClick={deleteRecipe}>Delete This Recipe</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <hr style={{ margin: '50px 0px 50px 0px' }} />
                            <div>
                                <Ratings />
                            </div>
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