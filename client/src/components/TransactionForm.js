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





import InputAdornment from '@mui/material/InputAdornment';

import TextField from '@mui/material/TextField';
import {useState} from 'react'

const InitialForm = {
  amount:0,
  description:"",
  date: new Date(),

}


  export const TransactionForm = ({fetchTransactions}) => {
    const [form, setForm] = useState(InitialForm)
    function handleChange(e){
      setForm({...form, [e.target.name]: e.target.value})
    }
    function handleDate(newValue){
      setForm({...form,date: newValue})
    }

    async function handleSubmit(e){
      e.preventDefault() //prevent default submission of form
      //sends form to our api to be stored as a post request
      const res = await fetch("http://localhost:4000/transaction", {
        method:"POST", //creates transaction
        body: JSON.stringify(form),
        headers:{
          'content-type': "application/json" //makes sure json format is sent to backend
        }
      }); 
      const data = await res.json()
      if(res.ok){
        setForm(InitialForm)//clears input fields
        // fetchTransactions() // updates transactions in real time (without reload)
      }
      
      console.log(data)
    }

    return (
    
         <Card sx={{ minWidth: 275, marginTop: 10}}>
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
        <Button type= "submit" variant="outlined">Submit</Button>
       

        </form>
      
      </CardContent>
    
    </Card>
 );
  }
  