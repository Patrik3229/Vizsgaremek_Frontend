import '../css/Sidebar.scoped.css'

export function Sidebar() {
    return <div className="h-100 d-flex align-items-stretch">
    <nav id="sidebar" className="p-4">
      <div>
        <h2>
          <a href="index.html" className="logo noUnderline">
            Vizsgaremek
          </a>
        </h2>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="noUnderline">
              <div className="row">
                <div className="col-2"><span className="fa fa-home mr-3" /></div>
                <div className="col-10">Home</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="noUnderline">
              <div className="row">
                <div className="col-2"><span className="fa fa-gear mr-3" /></div>
                <div className="col-10">Profile</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="noUnderline">
              <div className="row">
                <div className="col-2"><span className="fa fa-users mr-3" /></div>
                <div className="col-10">Users</div>
              </div>
            </a>
          </li>
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
          <div className="my-2">
            <button className="btn btn-primary navbarbutton">Create a new recipe</button>
          </div>
          <div className="my-2">
            <button className="btn btn-primary navbarbutton">Login</button>
          </div>
          <div className="my-2">
            <button className="btn btn-primary navbarbutton">Register</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
  
} 