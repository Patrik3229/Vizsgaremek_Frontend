import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from "../Components/Sidebar";
import '../css/Root.scoped.css';
import '../css/Profile.scoped.css';
import { ApiContext } from "../api";
import { NeedsRole } from "../Components/auth";
import { TopRecipes } from "../Components/TopRecipes";


export default function Profile() {

    const { getUserById } = useContext(ApiContext);
    const {currentUser} = useContext(ApiContext);
    const { id } = useParams<{ id: string }>();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    console.log(currentUser?.id)
    console.log(userProfile?.id);

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
    }, [id, getUserById]);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userProfile) {
        return <div>No profile found</div>;
    }

    return <>
        <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
            <div className="row" style={{ height: '100vh' }}>
                <div className="col-2" style={{ height: '100vh' }}>
                    <Sidebar />
                </div>
                <div className="col-8" style={{ padding: '20px 50px 50px 50px' }}>
                    <h1>User profile: {userProfile.name}</h1>
                    <h4 style={{ marginBottom: '20px' }}>Role: {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}</h4>
                    <NeedsRole role='manager'>
                        <button className="btn btn-primary w-100">Edit User</button>
                    </NeedsRole>
                    <h4 style={{ marginTop: '50px' }}>Posted recipes:</h4>
                    <div className="card w-100" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <div className="spbw">
                                <h5 className="card-title">title</h5>
                                <h5 className="card-title">preptime</h5>
                            </div>
                            <h6 className="card-subtitle mb-2 text-body-secondary">description</h6>
                            <div className="spbw">
                                <span>Allergens:</span>
                                <span className="fa fa-solid fa-star"></span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-2">
                    {/* Placeholder */}
                    <TopRecipes />
                </div>
            </div>
        </div>
    </>
}