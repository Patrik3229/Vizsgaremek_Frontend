import { useNavigate } from 'react-router-dom';
import '../css/CreateRecipe.scoped.css'
import { FormEvent, useContext, useState } from 'react';
import { ApiContext } from '../api';

export default function CreateRecipe() {

    const { token } = useContext(ApiContext);

    const [postError, setPostError] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [preptime, setPreptime] = useState('');
    const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
    const navigate = useNavigate();
    
    async function post(e: FormEvent) {
        e.preventDefault();

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

        const data = {
            title,
            description,
            content,
            preptime: Number(preptime),
            allergens: selectedAllergens
        }

        const response = await fetch(`http://localhost:3000/recipes/post`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorObj = await response.json();
            setPostError(errorObj.message);
            return;
        }

        navigate('/');
    }

    return <>
    <div className="row h-100 w-100" id="mainpage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='card'>
                <form onSubmit={post}>
                    <div className="form-group required">
                        <label htmlFor="title" className='mb'>Recipe Name</label>
                        <input type="text" className="form-control" id="title" name="title" required onChange={e => setTitle(e.currentTarget.value)}/>
                    </div>
                    <div className="form-group required">
                        <label htmlFor="description">Description</label>
                        <p className='mb'>A short description about the recipe itself.</p>
                        <textarea className="form-control" id="description" name="description" required onChange={e => setDescription(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="content">Content</label>
                        <p className='mb'>Ingredients & the process of making the food.</p>
                        <textarea className="form-control" id="content" name="content" required onChange={e => setContent(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="preptime" className='mb'>Prepatation time (in minutes)</label>
                        <input type="number" className="form-control" id="preptime" name="preptime" required onChange={e => setPreptime(e.currentTarget.value)} />
                    </div>
                    <div>
                        <button className="btn btn-primary w-100" type="submit">
                            Post Recipe
                        </button>
                    </div>
                </form>
                <p className="pt-3">
                    <div className="text-danger text-center">
                        <a href="/">Go back</a>
                    </div>
                </p>
                {postError && <p className="text-danger text-center">{postError}</p>}
            </div>
        </div>
    </div>
    </>
}