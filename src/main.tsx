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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>,
)
