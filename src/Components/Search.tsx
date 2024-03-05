import '../css/Search.scoped.css'

export function Search(){
    function searchLogic(){
        console.log("Search logic will go here");
    }
    
    return <>
        <form onSubmit={searchLogic} role="search" id='search'>
            <input id="search" type="search" placeholder="Search..." required />
            <button type="submit">Go</button>
        </form>
    </>
}