import { Search } from './Components/Search';
import { Sidebar } from './Components/Sidebar';
import { TopRecipes } from './Components/TopRecipes';
function App() {

  return (
    <>
      <div className="container-fluid" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100vh' }}>
          <div className="col-2" style={{ height: '100vh' }}>
            <Sidebar />
          </div>
          <div className="col-8">
            <Search />
          </div>
          <div className="col-2">
            <TopRecipes />
          </div>
        </div>
      </div>
  </>
  )
}

export default App
