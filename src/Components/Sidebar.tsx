import { useContext } from 'react'
import '../css/Sidebar.scoped.css'
import { Guest, LoggedIn } from './auth'
import { ApiContext } from '../api'
import { Logout } from './Logout';

export function Sidebar() {

    const api = useContext(ApiContext);
    
    return <div className="h-100 d-flex align-items-stretch">
    <nav id="sidebar" className="p-4">
      <div>
        <h2>
          <a href="/" className="noUnderline" id='pageTitle'>
            Vizsgaremek
          </a>
        </h2>
        <ul className="list-unstyled">
          <li>
            <a href="/" className="noUnderline">
              <div className="row">
                <div className="col-2"><span className="fa fa-home mr-3" /></div>
                <div className="col-10">Home</div>
              </div>
            </a>
          </li>
          <LoggedIn>
            <li>
              <a href={`/profile/${api.currentUser?.id}`} className="noUnderline">
                <div className="row">
                  <div className="col-2"><span className="fa fa-gear mr-3" /></div>
                  <div className="col-10">Profile</div>
                </div>
              </a>
            </li>
          </LoggedIn>
          <li>
            <a href="#" className="noUnderline">
              <div className="row">
                <div className="col-2"><span className="fa fa-info-circle mr-3" /></div>
                <div className="col-10">About Us</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="footer">
          <Guest>
            <div className="my-2">
              <a href="/login"><button className="btn btn-primary navbarbutton">Login</button></a>
            </div>
            <div className="my-2">
              <a href="/register"><button className="btn btn-primary navbarbutton">Register</button></a>
            </div>
          </Guest>
          <LoggedIn>
          <div className="my-2">
            <a href="/CreateRecipe"><button className="btn btn-primary navbarbutton">Create a new recipe</button></a>
          </div>
          <Logout />
          </LoggedIn>
        </div>
      </div>
    </nav>
  </div>
  
} 