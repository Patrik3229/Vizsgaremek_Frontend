import { useEffect, useState } from 'react';
import '../css/MainPage.scoped.css'

export function MainPage() {

    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        const message = localStorage.getItem('recipeAdded');
        if (message) {
            setSuccessMessage(message);
            localStorage.removeItem('recipeAdded');
        }
    }, []);

    return <div className='row'>
        <div>
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
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