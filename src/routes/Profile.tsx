import { useContext } from "react";
import { Sidebar } from "../Components/Sidebar";
import '../css/Root.scoped.css';
import '../css/Profile.scoped.css';
import { ApiContext } from "../api";
import { NeedsRole } from "../Components/auth";
import { TopRecipes } from "../Components/TopRecipes";


export default function Profile() {

    const { currentUser } = useContext(ApiContext);

    if (!currentUser) {
        return <div>Loading user data...</div>;
    }

    return <>
        <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
            <div className="row" style={{ height: '100vh' }}>
                <div className="col-2" style={{ height: '100vh' }}>
                    <Sidebar />
                </div>
                <div className="col-8" style={{ padding: '20px 50px 50px 50px' }}>
                    <h1>User profile: {currentUser.name}</h1>
                    <h4 style={{ marginBottom: '20px' }}>Role: {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</h4>
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