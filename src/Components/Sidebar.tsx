export function Sidebar() {
    return <div className="wrapper d-flex align-items-stretch">
    <nav id="sidebar">
      <div className="p-4">
        <h2>
          <a href="index.html" className="logo noUnderline">
            Website name
          </a>
        </h2>
        <ul className="list-unstyled components">
          <li className="active">
            <a href="#" className="noUnderline">
              <span className="fa fa-home mr-3" /> Home
            </a>
          </li>
          <li>
            <a href="#" className="noUnderline">
              <span className="fa fa-user mr-3" /> About Us
            </a>
          </li>
          <li>
            <a href="#" className="noUnderline">
              <span className="fa fa-briefcase mr-3" /> Portfolio
            </a>
          </li>
          <li>
            <a href="#" className="noUnderline">
              <span className="fa fa-sticky-note mr-3" /> Blog
            </a>
          </li>
          <li>
            <a href="#" className="noUnderline">
              <span className="fa fa-paper-plane mr-3" /> Contact
            </a>
          </li>
        </ul>
        <div className="footer">
          <div className="my-3">
            <button className="btn btn-primary navbarbutton">Create a new recipe</button>
          </div>
          <div className="my-3">
            <button className="btn btn-primary navbarbutton">Login</button>
          </div>
          <div className="my-3">
            <button className="btn btn-primary navbarbutton">Register</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
  
} 