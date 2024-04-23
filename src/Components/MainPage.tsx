import { useEffect, useState } from 'react';

/**
 * Főoldal komponens & alertek.
 * @component
 * @returns A főoldal komponenst.
 */
export function MainPage() {

    const [recipeAddedMessage, setRecipeAddedMessage] = useState('');
    const [userNotFoundMessage, setUserNotFoundMessage] = useState('');
    const [recipeNotFoundMessage, setRecipeNotFoundMessage] = useState('');
    const [recipeDeletedMessage, setRecipeDeletedMessage] = useState('');
    const [searchNotSuccessfulMessage, setSearchNotSuccessfulMessage] = useState('');
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');
    
    useEffect(() => {
        const recipeMessage  = localStorage.getItem('recipeAdded');
        const userNotFound = localStorage.getItem('userNotFound');
        const recipeNotFound = localStorage.getItem('recipeNotFound');
        const recipeDeleted = localStorage.getItem('recipeDeleted');
        const searchNotSuccessful = localStorage.getItem('searchNotSuccessful');
        const registerSuccess = localStorage.getItem('registerSuccess');

        if (recipeMessage) {
            setRecipeAddedMessage(recipeMessage);
            localStorage.removeItem('recipeAdded');
        }

        if (userNotFound) {
            setUserNotFoundMessage(userNotFound);
            localStorage.removeItem('userNotFound');
        }

        if (recipeNotFound) {
            setRecipeNotFoundMessage(recipeNotFound);
            localStorage.removeItem('recipeNotFound');
        }

        if (recipeDeleted) {
            setRecipeDeletedMessage(recipeDeleted);
            localStorage.removeItem('recipeDeleted');
        }

        if (searchNotSuccessful) {
            setSearchNotSuccessfulMessage(searchNotSuccessful);
            localStorage.removeItem('searchNotSuccessful');
        }

        if (registerSuccess) {
            setRegisterSuccessMessage(registerSuccess);
            localStorage.removeItem('registerSuccess');
        }
    }, []);

    return <div className='row'>
        <div>
            {recipeAddedMessage && <p className="alert alert-success">{recipeAddedMessage}</p>}
            {userNotFoundMessage && <p className="alert alert-danger">{userNotFoundMessage}</p>}
            {recipeNotFoundMessage && <p className="alert alert-danger">{recipeNotFoundMessage}</p>}
            {recipeDeletedMessage && <p className="alert alert-success">{recipeDeletedMessage}</p>}
            {searchNotSuccessfulMessage && <p className="alert alert-danger">{searchNotSuccessfulMessage}</p>}
            {registerSuccessMessage && <p className="alert alert-success">{registerSuccessMessage}</p>}
        </div>
        <h1>Welcome to our page!</h1>
        <p>This is a website which you can upload and view recipes! Start browsing now!</p><br />
        <h4>Authors:</h4>
        <ul style={{paddingLeft: '40px'}}>
            <li>Elekes Fanni</li>
            <li><s>Fecske Márk</s></li>
            <li>Kovács Patrik</li>
        </ul>
    </div>
}