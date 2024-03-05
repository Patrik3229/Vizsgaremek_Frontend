import '../css/TopRecipes.scoped.css'

export function TopRecipes() {
    return <div className="h-100 d-flex align-items-stretch">
    <nav id="sidebar" className="p-4">
      <div>
        <h2 style={{textAlign: 'center'}}>
          <a href="index.html" className="logo noUnderline">
            Top recipes
          </a>
        </h2>
        <ul>
          <li>
            <a href="#">
              <div>Rice with roasted chicken</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div>Rice with roasted chicken</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div>Rice with roasted chicken</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div>Rice with roasted chicken</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div>Rice with roasted chicken</div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
}