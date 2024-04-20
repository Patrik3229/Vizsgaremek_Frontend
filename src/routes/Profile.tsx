import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from "../Components/Sidebar";
import '../css/Root.scoped.css';
import '../css/Profile.scoped.css';
import { ApiContext } from "../api";
import { NeedsRole } from "../Components/auth";
import { TopRecipes } from "../Components/TopRecipes";

/**
 * Interfész a receptek definiálására.
 * @interface
 */
interface Recipe {
    id: number;
    title: string;
    preptime: number;
    description: string;
    allergen_ids: string[];
}

/**
 * Interfész az értékelések tárolására.
 * @interface
 */
interface RatingMap {
    [key: number]: string | number;
}

/**
 * Profil komponens, amely a felhasználói profil és a hozzá kapcsolódó receptek megjelenítéséért felel.
 * @returns A felhasználói profil komponenst.
 */
export default function Profile() {

    const { getUserById } = useContext(ApiContext);
    const { currentUser } = useContext(ApiContext);
    const { id } = useParams<{ id: string }>();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [ratings, setRatings] = useState<RatingMap>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, _setItemsPerPage] = useState(3);
    const [loading, setLoading] = useState(true);
    const [recipesLoading, setRecipesLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileUpdatedMessage, setProfileUpdatedMessage] = useState('');

    const navigate = useNavigate();

    /**
     * Recept megtekintésére szolgáló navigációs függvény.
     * @param {number} recipeId - A megtekintendő recept azonosítója.
     */
    const goToRecipe = (recipeId: number) => {
        navigate(`/recipe/${recipeId}`);
    };

    useEffect(() => {
        setLoading(true);
        getUserById(Number(id))
            .then(profile => {
                setUserProfile(profile);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch user profile:", err);
                setError('Failed to load profile');
                localStorage.setItem('userNotFound', 'User profile not found.');
                setLoading(false);
                navigate('/');
            });

        setRecipesLoading(true);

        fetch(`http://localhost:3000/recipes/find-user/${id}`)
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setRecipesLoading(false);
                return data.map((recipe: Recipe) => {
                    const fetchUrl = `http://localhost:3000/ratings/find${recipe.id}`;
                    return fetch(fetchUrl)
                        .then(res => res.json())
                        .catch(error => {
                            console.error('Failed to fetch rating for recipe', recipe.id, error);
                            return { id: recipe.id, rating: "No rating available" };
                        });
                });
            })
            .then(ratingPromises => Promise.all(ratingPromises))
            .then(ratingsData => {

                const ratingsMap = ratingsData.reduce((acc, rating, _index) => {

                    acc[rating.id] = rating.rating;
                    return acc;
                }, {});
                setRatings(ratingsMap);
            })
            .catch(err => {
                console.error("Failed to fetch recipes or ratings:", err);
                setError('Failed to load recipes or ratings');
                setRecipesLoading(false);
            });

        const profileUpdated = localStorage.getItem('profileUpdated');

        if (profileUpdated) {
            setProfileUpdatedMessage(profileUpdated);
            localStorage.removeItem('profileUpdated');
        }

    }, [id, getUserById]);



    if (loading || recipesLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userProfile) {
        return <div>No profile found</div>;
    }

    const isOwnProfile = currentUser?.id === userProfile.id;

    const totalPages = Math.ceil(recipes.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const currentRecipes = recipes.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Oldalak közötti navigáció kezelője.
     * @param {number} newPage - Az új oldalszám.
     */
    const handleNavigation = (newPage: number) => {
        setCurrentPage(newPage);
    }

    return <>
        <div className="container-fluid h100vh" id="mainpage">
            <div className="row h100vh">
                <div className="col-2 h100vh">
                    <Sidebar />
                </div>
                <div className="col-10" id="middle">
                    <div className="row">
                        <div className="col-9" id="profile">
                            {profileUpdatedMessage && <p className="alert alert-success">{profileUpdatedMessage}</p>}
                            <h1>User profile: {userProfile.name}</h1>
                            <h4 id="role">Role: {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}</h4>
                            {isOwnProfile ? (
                                <><a href={`/edit-profile/${currentUser!.id}`}> <button className="btn btn-primary w-100 mb-3">Edit My Profile</button></a></>

                            ) : (
                                <NeedsRole role='manager'>
                                    <><a href={`/edit-profile/${userProfile.id}`}><button className="btn btn-primary w-100">Edit User</button></a></>
                                </NeedsRole>
                            )}
                            <h4 id="postedRecipes">Posted recipes:</h4>
                            {currentRecipes.map(recipe => (
                                <div className="card w-100 mb-3" key={recipe.id} onClick={() => goToRecipe(recipe.id)} style={{ cursor: "pointer" }}>
                                    <div className="card-body">
                                        <div className="spbw row mb-2">
                                            <h5 className="card-title col-10">{recipe.title}</h5>
                                            <h5 className="card-title col-2 text-end">{recipe.preptime} minutes</h5>
                                        </div>
                                        <p id="recipeDescription" className="card-subtitle mb-5">{recipe.description}</p>
                                        <div className="spbw">
                                            <span>Allergens: {recipe.allergen_ids}</span>
                                            <span><span className="fa fa-solid fa-star"></span> {ratings[recipe.id]} / 5</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        <div className="col-3">
                            <TopRecipes />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}