import { Navigate, redirect, useRevalidator } from 'react-router-dom'; //moves user to different route
import Cookies from "js-cookie"
import { useEffect, useState } from 'react';


export default function VerifyAuth({children}){
    const [isLoading, setisLoading] = useState(false)
    const token = Cookies.get("token");
    async function fetchUser(){
        setisLoading(true)
        const res = await fetch("http://localhost:4000/user", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        } )
        setisLoading(false)
        if (!res.ok){
            redirect('/login')
        }
        const {user} = await res.json()
        console.log("user is: ", user)
       
    }
    useEffect(()=>{
        fetchUser();
    }, [])
    if(isLoading){
        return  <p>loading...</p>
    }

   
    //return token ? children : <Navigate to= "/login" replace={true}/>
    return children
}