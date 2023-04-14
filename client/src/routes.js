
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import App from './App';
import VerifyAuth from './utils/VerifyAuth';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


export default createBrowserRouter([
    {
      
      element: <App/>,
      children: [
        {
        path: "/",
        //added VerifyAuth top level to protect home from unauth users
        element: (
            <VerifyAuth>
                <Home/>
            </VerifyAuth>
        )
  
      },
      {
        path: "/login",
        element: <Login/>,
  
      },
      {
        path: "/register",
        element: <Register/>,
  
      },
      
      ],
    },
   
  ]);