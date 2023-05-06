import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useState, useEffect} from 'react'
import { deepPurple } from '@mui/material/colors';
import Cookies from 'js-cookie';

export const UserIcon = () => {
    const InitialForm = {
        firstName: 'Nat',
    }
   // const [editTransaction, setEditTransaction] = useState({})
  const [curUser,setCurUser]= useState(InitialForm)
  

  //async function fetchuser(){ //default GET
//     const token = Cookies.get('token')
//     const res = await fetch('http://localhost:4000/user',{
//        headers:{
//         Authorization: `Bearer ${token}`,
//        }

//     })//fetches data
//     if (!res.ok){
//         alert('issue getting user')
       
//     }
//     const {data} = await res.json();
//     //const firstName = data.firstName
//     setCurUser(data)
//     alert("data is: ,", data.firstName)
    
//     //console.log(user)

//   }
//   useEffect(()=>{
//     fetchuser()
//   },[])
  
  return (
    <div>
        <Stack direction="row" spacing={2}>
          
        {/* {curUser.map((row, index) => (
            <div key = {row._id}> */}
           
     
            <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }} src ='/broken-link'></Avatar>
           
      {/* ))}  */}
    
   </Stack>
    </div>
  )
}
