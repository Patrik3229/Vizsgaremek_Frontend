import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Login from './routes/Login';
import Register from './routes/Register';
import { ApiProvider } from './api';
import CreateRecipe from './routes/CreateRecipe';
import Profile from './routes/Profile';
import RecipeView from './routes/RecipeView';
import EditRecipe from './routes/EditRecipe';
import EditUser from './routes/EditUser';
import SearchResults from './routes/SearchResults';
import { SearchProvider } from './Components/SearchContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:id",
    element: <Profile />
  },
  {
    path: "/createrecipe",
    element: <CreateRecipe />
  },
  {
    path: "/recipe/:id",
    element: <RecipeView />
  },
  {
    path: "/edit-recipe/:id",
    element: <EditRecipe />
  },
  {
    path: "/edit-profile/:id",
    element: <EditUser />
  },
  {
    path: "/search",
    element: <SearchResults />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider>
      <SearchProvider>
        
        <RouterProvider router={router} />
        
      </SearchProvider>
    </ApiProvider>
  </React.StrictMode>,
)
