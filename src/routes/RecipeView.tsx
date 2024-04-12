import { Sidebar } from "../Components/Sidebar";
import '../css/RecipeView.scoped.css';

export default function RecipeView(){
    return <>
    <div className="container-fluid" style={{ height: '100vh' }} id="mainpage">
        <div className="row" style={{ height: '100vh' }}>
            <div className="col-2" style={{ height: '100vh' }}>
                <Sidebar />
            </div>
            <div className="col-10">
                
            </div>
        </div>
    </div>
    </>
}