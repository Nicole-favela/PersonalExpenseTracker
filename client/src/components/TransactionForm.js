  //using mui card component 
 

  import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import "./TransactionListStyles.css"


import InputAdornment from '@mui/material/InputAdornment';

import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react'

const InitialForm = {
  amount:0,
  description:"",
  date: new Date(),

}


  export const TransactionForm = ({fetchTransactions, editTransaction}) => {
    const [form, setForm] = useState(InitialForm)
    //runs each time there is a change in edittransaction prop
    useEffect(()=>{
      if(editTransaction.amount !== undefined){ //if it is not an empty object
        setForm(editTransaction)
      }

    },[editTransaction])

    function handleChange(e){
      setForm({...form, [e.target.name]: e.target.value})
    }
    function handleDate(newValue){
      setForm({...form,date: newValue})
    }

    async function handleSubmit(e){
      e.preventDefault() //prevent default submission of form
      //sends form to our api to be stored as a post request
      const res = editTransaction.amount === undefined ? create() : update()

    }
    function reload(res){
      if(res.ok){
        setForm(InitialForm)//clears input fields
        fetchTransactions()
        // fetchTransactions() // updates transactions in real time (without reload)
      }
    }
    async function create(){
      const res = await fetch("http://localhost:4000/transaction", {
        method:"POST", //creates transaction
        body: JSON.stringify(form),
        headers:{
          'content-type': "application/json" //makes sure json format is sent to backend
        }
      }); 
    
      reload(res)

    }

    async function update(){
      const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`, {
        method:"PATCH", //creates transaction
        body: JSON.stringify(form),
        headers:{
          'content-type': "application/json" //makes sure json format is sent to backend
        }
      }); 
      reload(res)

    }

    return (
    
         <Card  className ="card-style" sx={{ minWidth: 275, marginTop: 10}}>
      <CardContent>
        <form onSubmit={handleSubmit}>

        <Typography variant="h6">
            Add new transaction
          
        </Typography>
        <TextField 
            id="filled-basic" 
            label="amount" 
            variant="filled" 
            size="small"
            sx = {{marginRight: 5}}
            value = {form.amount}
            name = "amount"
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            onChange={handleChange}
        />
        <TextField 
            id="filled-basic" 
            label="description" 
            variant="filled"
            sx = {{marginRight: 5}}
            size="small"
            name = "description"
            value = {form.description} 
            onChange={handleChange}
             />
            {/* change size of date picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            label="transaction date"
            inputFormat="MM/DD/YYYY"
            size="medium"
            value={form.date}
            // name = "date"
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} sx = {{marginRight: 5}} size = "small"{...params}/>}

           
            />
            
        </LocalizationProvider>
        {editTransaction.amount !== undefined && (
          <Button type="submit" variant="secondary">
            Update
          </Button>
        )}
         {editTransaction.amount === undefined && (
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        )}
        
       
       

        </form>
      
      </CardContent>
    
    </Card>
 );
  }
  