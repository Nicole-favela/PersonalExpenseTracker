
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import App from './App';
import VerifyAuth from './utils/VerifyAuth';
import UnAuth from './utils/UnAuth';

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
        //register and login shouldnt be visible if user not logged in
        path: "/login",
        element: (
        <UnAuth>
            <Login/>
        </UnAuth>
        )
      },
      {
        path: "/register",
        element: (
        <UnAuth>
            <Register/>,
        </UnAuth>
        )
        
       
  
      },
      
      ],
    },
   
  ]);