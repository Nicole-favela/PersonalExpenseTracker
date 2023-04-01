  //using mui card component 
 

  import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import InputAdornment from '@mui/material/InputAdornment';

import TextField from '@mui/material/TextField';


  export const TransactionForm = () => {
    //function handleChange
    return (
    
         <Card sx={{ minWidth: 275, marginTop: 10}}>
      <CardContent>
        <form>

        <Typography variant="h6">
            Add new transaction
          
        </Typography>
        <TextField 
            id="filled-basic" 
            label="amount" 
            variant="filled" 
            size="small"
            sx = {{marginRight: 5}}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
        />
        <TextField 
            id="filled-basic" 
            label="description" 
            variant="filled"
            sx = {{marginRight: 5}}
            size="small"
             />
            {/* change size of date picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            label="transaction date"
            inputFormat="MM/DD/YYYY"
            size="medium"
            //value={value}
            //onChange={handleChange}
            renderInput={(params) => <TextField {...params} sx = {{marginRight: 5}}/>}
            />
            
        </LocalizationProvider>
        <Button type= "submit" variant="outlined">Submit</Button>
       

        </form>
      
      </CardContent>
    
    </Card>
 );
  }
  