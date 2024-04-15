import { useEffect, useState } from 'react';
import '../css/TopRecipes.scoped.css'

export function TopRecipes() {

  const [topRecipes, setTopRecipes] = useState([]);

  // Fetch top recipes on component mount
  useEffect(() => {
    async function fetchTopRecipes() {
      try {
        const response = await fetch('http://localhost:3000/ratings/top-5');
        const data = await response.json();
        setTopRecipes(data); // Assuming the response is an array of recipes

        //console.log("Top Recipes Data:", data);
                data.forEach(recipe => {
                  console.log(`Title: ${recipe.title}, Rating Object:`, recipe.rating);
                });
      } catch (error) {
        console.error('Failed to fetch top recipes:', error);
      }
    }

    fetchTopRecipes();
  }, []); // Empty dependency array means this effect will only run once after the component mounts
  return <div className="h-100 d-flex align-items-stretch">
    <nav id="sidebar" className="p-4">
      <div>
        <h2 style={{ textAlign: 'center' }}>
          <a href="index.html" className="logo noUnderline">
            Top recipes
          </a>
        </h2>
        <ul>
          {topRecipes.map(recipe => (
            <li key={recipe.id}>
              <a href={`/recipe/${recipe.id}`}>
                <div>{recipe.title}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </div>
}