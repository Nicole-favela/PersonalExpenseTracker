import { Navigate, redirect, useRevalidator } from 'react-router-dom'; //moves user to different route
import Cookies from "js-cookie"
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function VerifyAuth({children}){
    const [isLoading, setisLoading] = useState(false)
    const token = Cookies.get("token");
    async function fetchUser(){
        setisLoading(true)
        const res = await fetch("https://expense-tracker-backend-30hw.onrender.com/user", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        } )
        setisLoading(false)
        console.log('in verify auth res is: ', res)
        if (!res.ok){
            console.log("redirecting to login")
            redirect('/login')
        }
        // const {user} = await res.json()
       
       
    }
    useEffect(()=>{
        fetchUser();
    }, []) 
    if(isLoading){
        return  (
         <Box sx={{ display: 'flex', padding: 1, ml: 2  }}>
                <CircularProgress />
          </Box>
        )
        // <p>loading...</p>
    }

    return children
}