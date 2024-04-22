import { MainPage } from "../Components/MainPage";
import { Search } from "../Components/Search";
import { Sidebar } from "../Components/Sidebar";
import { TopRecipes } from "../Components/TopRecipes";
import '../css/Root.scoped.css';

/**
 * A főoldal komponense.
 * @returns A főoldalt.
 */
export default function Root() {
  return (
    <>
      <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
        <div className="row" style={{ height: '100vh' }}>
          <div className="col-2" style={{ height: '100vh' }}>
            <Sidebar />
          </div>
          <div className="col-10" id="middle">
            <div className="row">
              <div className="col-9" id='search' style={{ padding: '20px 50px 50px 50px' }}>
                <Search />
                <MainPage />
              </div>
              <div className="col-3">
                <TopRecipes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}