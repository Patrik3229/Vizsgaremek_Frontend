import { useContext } from "react";
import { ApiContext } from "../api";
import '../css/Sidebar.scoped.css'
import { useNavigate } from "react-router-dom";

/**
 * Kijelentkezés logikájának meghívása & Log out gomb
 * @returns Log out gombot
 */
export function Logout(){

    const navigate = useNavigate();
    const { logout } = useContext(ApiContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return <div className="my-2">
    <button className="btn btn-danger navbarbutton" onClick={handleLogout}>Log out</button>
  </div>
}