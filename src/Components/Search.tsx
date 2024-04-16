import { FormEvent } from 'react';
import { useSearchResults } from './SearchContext';
import '../css/Search.scoped.css'
import { useNavigate } from 'react-router-dom';

export function Search({ children = null }) {

    const { searchText, setSearchText, setSearchResults, selectedAllergens, setSelectedAllergens } = useSearchResults();

    const navigate = useNavigate();

    const allergens = [
        { id: 1, name: 'Gluten' },
        { id: 2, name: 'Crustaceans' },
        { id: 3, name: 'Eggs' },
        { id: 4, name: 'Fish' },
        { id: 5, name: 'Peanuts' },
        { id: 6, name: 'Soybeans' },
        { id: 7, name: 'Milk' },
        { id: 8, name: 'Nuts' },
        { id: 9, name: 'Celery' },
        { id: 10, name: 'Mustard' },
        { id: 11, name: 'Sesame seeds' },
        { id: 12, name: 'Sulphur dioxide' },
        { id: 13, name: 'Lupin' },
        { id: 14, name: 'Molluscs' },
    ];

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
                                <li key={allergen.id}>
                                    <label htmlFor={`allergen-${allergen.id}`}>
                                        <input
                                            type="checkbox"
                                            id={`allergen-${allergen.id}`}
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