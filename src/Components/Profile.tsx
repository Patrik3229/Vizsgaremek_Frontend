import { Search } from "./Search"
import { Sidebar } from "./Sidebar"
import { TopRecipes } from "./TopRecipes"
import '../css/Root.scoped.css'


export function Profile() {

    return <>
        <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
            <div className="row" style={{ height: '100vh' }}>
                <div className="col-2" style={{ height: '100vh' }}>
                    <Sidebar />
                </div>
                <div className="col-8" id='search' style={{ padding: '20px 50px 50px 50px' }}>
                    <Search />
                    <div className='row'>
                        <h1>User profile</h1>
                        <p>This is a website which you can upload, view, rate and even comment on recipes! Start browsing now!</p><br />
                        <h4>Authors:</h4>
                        <ul style={{ paddingLeft: '40px' }}>
                            <li>Elekes Fanni</li>
                            <li>Fecske Márk</li>
                            <li>Kovács Patrik</li>
                        </ul>
                    </div>
                </div>
                <div className="col-2">
                    <TopRecipes />
                </div>
            </div>
        </div>
    </>
}