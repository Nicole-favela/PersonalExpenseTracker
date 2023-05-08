  //using mui card component 
 

  import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Autocomplete } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import "./TransactionListStyles.css"
import Cookies from 'js-cookie';


import InputAdornment from '@mui/material/InputAdornment';

import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react'

const InitialForm = {
  amount:0,
  description:"",
  date: new Date(),
  categories: '',

}


  export const TransactionForm = ({fetchTransactions, editTransaction, transactions}) => {
   
    const categories = [
      {label: 'Shopping'},
      {label: 'Bills'},
      {label: 'Food'},
      {label: 'Entertainment'},
      {label: 'Investing'},
      {label: 'Hobbies'},
      {label: 'Misc'},
  ]
  
    
    const token = Cookies.get('token')
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
      editTransaction.amount === undefined ? create() : update()

    }
    function reload(res){
      if(res.ok){
        setForm(InitialForm)//clears input fields
        fetchTransactions()
      
      }
    }
    async function create(){
      const res = await fetch("https://expense-tracker-backend-30hw.onrender.com/transaction", {
        method:"POST", //creates transaction
        body: JSON.stringify(form),
        headers:{
          'content-type': "application/json", //makes sure json format is sent to backend
          Authorization: `Bearer ${token}`,
        }
      }); 
    
      reload(res)

    }

    async function update(){
      const res = await fetch(`https://expense-tracker-backend-30hw.onrender.com/transaction/${editTransaction._id}`, {
        method:"PATCH", 
        body: JSON.stringify(form),
        headers:{
          'content-type': "application/json", //makes sure json format is sent to backend
          Authorization: `Bearer ${token}`,
        }
      }); 
      reload(res)

    }

    return (
    
         <Card  className ="card-style" sx={{ minWidth: 350, marginTop: 10}}>
      <CardContent className= 'card-content'>
     

        <Typography variant="h6">
            Add new transaction
          
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx ={{display: 'flex', '& .MuiTextField-root': { m: 1, width: '25ch' }}} >
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
            size="small"
            value={form.date}
            // name = "date"
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} sx = {{marginRight: 5}} size = "small"{...params}/>}

           
            />
            
        </LocalizationProvider>
        {/* for categories */}
        <div> <br/></div>
        <Autocomplete
         
          size="small"
          disablePortal
          id="combo-box-demo"
          options={categories}
          onChange={(e, newValue) => {
            setForm({...form, categories: newValue});
          }}
          //onChange ={handleCategory(newValue)}
          //onChange={handleChange}
          //getOptionLabel={(transactions)=>transactions.description}
          sx={{ width: 200 }}
          renderInput={(params) => (<TextField {...params} size="small" label="category" />)}
      />

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
        
       
       

        </Box>
      
      </CardContent>
    
    </Card>
 );
  }
  