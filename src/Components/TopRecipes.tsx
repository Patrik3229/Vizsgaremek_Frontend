import { useEffect, useState } from 'react';
import '../css/TopRecipes.scoped.css'

export function TopRecipes() {

  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);

  interface Recipe {
    id: number,
    title: string
  }

  // Fetch top recipes on component mount
  useEffect(() => {
    async function fetchTopRecipes() {
      try {
        const response = await fetch('http://localhost:3000/ratings/top-5');
        const data = await response.json();
        setTopRecipes(data); // Assuming the response is an array of recipes

      } catch (error) {
        console.error('Failed to fetch top recipes:', error);
      }
    }

    fetchTopRecipes();
  }, []); // Empty dependency array means this effect will only run once after the component mounts
  return <div>
    <nav id="sidebar" className="p-4">
      <div>
        <h2 style={{ textAlign: 'center' }}>
          Top recipes
        </h2>
        <ul className='list-unstyled'>
          {topRecipes.map(recipe => (
            <li key={recipe.id}>

              <a className='noUnderline' href={`/recipe/${recipe.id}`}>
                <div className="row">
                  <div className="col-1"><i className="fa fa-cutlery"></i></div>
                  <div className="col-11">{recipe.title}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </div>
}