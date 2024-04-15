import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/EditRecipe.scoped.css';

export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [preptime, setPreptime] = useState('');
    const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
    const [postError, setPostError] = useState('');

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

    interface AllergenObject {
        name: string;
    }

    useEffect(() => {
        async function fetchRecipeAndAllergens() {
            try {
                const response = await fetch(`http://localhost:3000/recipes/find${id}`);
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setContent(data.content);
                setPreptime(data.preptime);
                
                const allergensResponse = await fetch(`http://localhost:3000/allergens/find-recipe/${id}`);
                const allergenText = await allergensResponse.text();
                const allergenObjects = JSON.parse(allergenText);
                console.log('Allergen Objects:', allergenObjects);

                const allergenIds = allergenObjects.map((obj: AllergenObject) => {
                    const label = obj.name;  // Accessing the name property directly from the parsed object
                    const found = allergens.find(allergen => allergen.name.toLowerCase() === label.toLowerCase());
                    console.log('Searching for:', label, 'Found:', found);
                    return found ? found.id : null;
                }).filter((id: number | null) => id !== null);
    
                setSelectedAllergens(allergenIds);
                console.log('Selected Allergen IDs:', allergenIds);
                
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        }

        fetchRecipeAndAllergens();
    }, [id, navigate]);

    // Function to handle form submission
    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedRecipe = {
            title, description, content, preptime: parseInt(preptime, 10), allergens: Array.from(selectedAllergens),
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/recipes/update${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedRecipe),
            });
            if (!response.ok) throw new Error('Failed to update the recipe.');
            console.log(response);
            navigate(`/recipes/${id}`);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            console.error('Update failed:', message);
            setPostError(message);
        }
    };

    const toggleAllergen = (id: number) => {
        const newSelectedAllergens = selectedAllergens.includes(id)
            ? selectedAllergens.filter(allergenId => allergenId !== id) // Remove id
            : [...selectedAllergens, id]; // Add id
        setSelectedAllergens(newSelectedAllergens);
    };
    return (
        <div className="row h-100 w-100" id="mainpage">
            <div className="col-4 m-auto" id='recipeEdit'>
                <div className="card card-body" id='card'>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group required">
                            <label htmlFor="title" className='mb'>Recipe Name</label>
                            <input type="text" value={title} className="form-control" id="title" name="title" required onChange={e => setTitle(e.currentTarget.value)} />
                        </div>
                        <div className="form-group required">
                            <label htmlFor="description">Description</label>
                            <p className='mb'>A short description about the recipe itself.</p>
                            <textarea className="form-control" value={description} id="description" name="description" required onChange={e => setDescription(e.currentTarget.value)} />
                        </div>
                        <div className="form-group required">
                            <label htmlFor="content">Content</label>
                            <p className='mb'>Ingredients & the process of making the food.</p>
                            <textarea className="form-control" value={content} id="content" name="content" required onChange={e => setContent(e.currentTarget.value)} />
                        </div>
                        <div className="form-group required">
                            <label htmlFor="preptime" className='mb'>Prepatation time (in minutes)</label>
                            <input type="number" value={preptime} className="form-control" id="preptime" name="preptime" required onChange={e => setPreptime(e.currentTarget.value)} />
                        </div>
                        <div className=" w-100 mb-5" id='allergensButton'>
                            <label htmlFor="title" className='mb'>Allergens</label>
                            <ul className="w-100 grid-container" id='allergensList' style={{ listStyleType: 'none', padding: '0' }}>
                                {allergens.map(allergen => (
                                    <li key={allergen.id}>
                                        <label htmlFor={`allergen-${allergen.id}`}>
                                            <input
                                                type="checkbox"
                                                id={`allergen-${allergen.id}`}
                                                checked={selectedAllergens.includes(allergen.id)}
                                                onChange={() => toggleAllergen(allergen.id)}
                                            />&nbsp;{allergen.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="btn btn-primary w-100 fw-bold" type="submit">Update Recipe</button>
                    </form>
                    <p className="pt-3">
                        <div className="text-danger text-center">
                            <a href={`/recipe/${id}`}>Go back</a>
                        </div>
                    </p>
                    {postError && <p className="text-danger text-center">{postError}</p>}
                </div>
            </div>
        </div>
    );
}