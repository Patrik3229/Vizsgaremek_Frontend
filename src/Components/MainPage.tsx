import { useEffect, useState } from 'react';

export function MainPage() {

    const [recipeAddedMessage, setRecipeAddedMessage] = useState('');
    const [userNotFoundMessage, setUserNotFoundMessage] = useState('');
    const [recipeNotFoundMessage, setRecipeNotFoundMessage] = useState('');
    const [recipeDeletedMessage, setRecipeDeletedMessage] = useState('');
    
    useEffect(() => {
        const recipeMessage  = localStorage.getItem('recipeAdded');
        const userNotFound = localStorage.getItem('userNotFound');
        const recipeNotFound = localStorage.getItem('recipeNotFound');
        const recipeDeleted = localStorage.getItem('recipeDeleted');

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
    }, []);

    return <div className='row'>
        <div>
            {recipeAddedMessage && <p className="alert alert-success">{recipeAddedMessage}</p>}
            {userNotFoundMessage && <p className="alert alert-danger">{userNotFoundMessage}</p>}
            {recipeNotFoundMessage && <p className="alert alert-danger">{recipeNotFoundMessage}</p>}
            {recipeDeletedMessage && <p className="alert alert-success">{recipeDeletedMessage}</p>}
        </div>
        <h1>Welcome to our page!</h1>
        <p>This is a website which you can upload, view, rate and even comment on recipes! Start browsing now!</p><br />
        <h4>Authors:</h4>
        <ul style={{paddingLeft: '40px'}}>
            <li>Elekes Fanni</li>
            <li><s>Fecske Márk</s></li>
            <li>Kovács Patrik</li>
        </ul>
    </div>
}