import { FormEvent, useState } from 'react';
import '../css/Search.scoped.css'

export function Search() {

    const [searchText, SetSearchText] = useState('');
    const [searchError, setSearchError] = useState('');

    async function searchLogic(e: FormEvent) {
        e.preventDefault();

        const searchData = {
            searchText,
        }

        const response = await fetch(`http://localhost:3000/search`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(searchData),
        });

        if (!response.ok) {
            const errorObj = await response.json();
            setSearchError(errorObj.message);
            return;
        }
    }

    return <>
        <div className="row">
            <form onSubmit={searchLogic} role="search" id='search' className='d-flex w-100'>
            <div className="col-10" id='searchBox'>
                    <input id="search" type="search" placeholder="Search..." onChange={e => SetSearchText(e.currentTarget.value)} required />
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
                            <li>
                                <label htmlFor='gluten'>
                                    <input type="checkbox" name="" id="gluten" /> Gluten
                                </label>
                            </li>
                            <li>
                                <label htmlFor='crustaceans'>
                                    <input type="checkbox" name="" id="crustaceans" /> Crustaceans
                                </label>
                            </li>
                            <li>
                                <label htmlFor='eggs'>
                                    <input type="checkbox" name="" id="eggs" /> Eggs
                                </label>
                            </li>
                            <li>
                                <label htmlFor='fish'>
                                    <input type="checkbox" name="" id="fish" /> Fish
                                </label>
                            </li>
                            <li>
                                <label htmlFor='peanuts'>
                                    <input type="checkbox" name="" id="peanuts" /> Peanuts
                                </label>
                            </li>
                            <li>
                                <label htmlFor='soybeans'>
                                    <input type="checkbox" name="" id="soybeans" /> Soybeans
                                </label>
                            </li>
                            <li>
                                <label htmlFor='milk'>
                                    <input type="checkbox" name="" id="milk" /> Milk
                                </label>
                            </li>
                            <li>
                                <label htmlFor='nuts'>
                                    <input type="checkbox" name="" id="nuts" /> Nuts
                                </label>
                            </li>
                            <li>
                                <label htmlFor='celery'>
                                    <input type="checkbox" name="" id="celery" /> Celery
                                </label>
                            </li>
                            <li>
                                <label htmlFor='mustard'>
                                    <input type="checkbox" name="" id="mustard" /> Mustard
                                </label>
                            </li>
                            <li>
                                <label htmlFor='sesame_seeds'>
                                    <input type="checkbox" name="" id="sesame_seeds" /> Sesame seeds
                                </label>
                            </li>
                            <li>
                                <label htmlFor='sulphur_dioxide'>
                                    <input type="checkbox" name="" id="sulphur_dioxide" /> Sulphur dioxide
                                </label>
                            </li>
                            <li>
                                <label htmlFor='lupin'>
                                    <input type="checkbox" name="" id="lupin" /> Lupin
                                </label>
                            </li>
                            <li>
                                <label htmlFor='molluscs'>
                                    <input type="checkbox" name="" id="molluscs" /> Molluscs
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        <p>{searchError}</p>
    </>
}