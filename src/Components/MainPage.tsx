import { useEffect, useState } from 'react';
import '../css/MainPage.scoped.css'

export function MainPage() {

    const [recipeAddedMessage, setRecipeAddedMessage] = useState('');
    const [userNotFoundMessage, setUserNotFoundMessage] = useState('');
    const [recipeNotFoundMessage, setRecipeNotFoundMessage] = useState('');
    
    useEffect(() => {
        const recipeMessage  = localStorage.getItem('recipeAdded');
        const userNotFound = localStorage.getItem('userNotFound');
        const recipeNotFound = localStorage.getItem('recipeNotFound');

        if (recipeMessage) {
            setRecipeAddedMessage(recipeMessage);
            localStorage.removeItem('recipeAdded');
        }

        if (userNotFound) {
            setUserNotFoundMessage(userNotFound);
            localStorage.removeItem('userNotFound');
        }

        if (recipeNotFound) {
            setUserNotFoundMessage(recipeNotFound);
            localStorage.removeItem('recipeNotFound');
        }
    }, []);

    return <div className='row'>
        <div>
            {recipeAddedMessage && <p className="alert alert-success">{recipeAddedMessage}</p>}
            {userNotFoundMessage && <p className="alert alert-danger">{userNotFoundMessage}</p>}
        </div>
        <h1>Welcome to our page!</h1>
        <p>This is a website which you can upload, view, rate and even comment on recipes! Start browsing now!</p><br />
        <h4>Authors:</h4>
        <ul style={{paddingLeft: '40px'}}>
            <li>Elekes Fanni</li>
            <li>Fecske Márk</li>
            <li>Kovács Patrik</li>
        </ul>
    </div>
}