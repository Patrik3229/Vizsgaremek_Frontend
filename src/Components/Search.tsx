import { FormEvent } from 'react';
import { useSearchResults } from './SearchContext';
import '../css/Search.scoped.css'
import { useNavigate } from 'react-router-dom';
import allergens from '../allergens';

export function Search({ children = null }) {

    const { searchText, setSearchText, setSearchResults, selectedAllergens, setSelectedAllergens } = useSearchResults();

    const navigate = useNavigate();

    const toggleAllergen = (id: number) => {
        const newSelectedAllergens = selectedAllergens.includes(id)
            ? selectedAllergens.filter(allergenId => allergenId !== id) // Remove id
            : [...selectedAllergens, id]; // Add id
        setSelectedAllergens(newSelectedAllergens);
    };

    async function searchLogic(e: FormEvent) {
        e.preventDefault();

        const searchData = {
            searchText,
            selectedAllergens
        }

        const response = await fetch(`http://localhost:3000/recipes/searchContent`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(searchData),
        });

        if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
            console.log('Search Response:', data);
            navigate('/search')
        }
        else {
            //const errorObj = await response.json();
            //setSearchError(errorObj.message);
            return;
        }
    }

    return <>

        <div className="row">
            <form onSubmit={searchLogic} role="search" className='d-flex w-100'>
                <div className="col-10" id='searchBox'>
                    <input type="search" placeholder="Search..." onChange={e => setSearchText(e.currentTarget.value)} required />
                    <button type="submit" id='searchButton'>Go</button>
                </div>
                <div className="col-2">
                    <div className="btn-group" id='allergensButton'>
                        <button
                            type="button"
                            className="btn btn-danger dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="false"
                        >
                            Intolerances
                        </button>
                        <ul className="dropdown-menu" id='allergensList'>
                            {allergens.map(allergen => (
                                <li key={allergen.id} className='dropdown-item'>
                                    <label htmlFor={`allergen-${allergen.id}`} className='pointerCursor'>
                                        <input
                                            type="checkbox"
                                            id={`allergen-${allergen.id}`}
                                            className='pointerCursor'
                                            onChange={() => toggleAllergen(allergen.id)}
                                        />&nbsp;{allergen.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </form>
            {children}
        </div>
        {/*<p>{searchError}</p>*/}
    </>
}