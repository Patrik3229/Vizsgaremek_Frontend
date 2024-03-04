import { Search } from './Components/Search';
import { Sidebar } from './Components/Sidebar';
function App() {

  return (
    <>
      <div className="container-fluid" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100vh' }}>
          <div className="col-2" style={{ height: '100vh' }}>
            <Sidebar />
          </div>
          <div className="col-10">
            <Search />
          </div>
        </div>
      </div>
  </>
  )
}

export default App
