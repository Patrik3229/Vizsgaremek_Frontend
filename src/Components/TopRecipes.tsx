import '../css/TopRecipes.scoped.css'

export function TopRecipes() {
    return <div className="h-100 d-flex align-items-stretch">
    <nav id="sidebar" className="p-4">
      <div>
        <h2>
          <a href="index.html" className="logo noUnderline">
            Top recipes
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
      
    </nav>
  </div>
}