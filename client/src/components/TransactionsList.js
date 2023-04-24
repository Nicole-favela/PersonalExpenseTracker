import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableSortLabel, Typography } from '@mui/material';
import {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
//custom styles
import "./TransactionListStyles.css"
import dayjs from 'dayjs';
import Cookies from 'js-cookie';


export default function TransactionsList({transactions, fetchTransactions,setEditTransaction}) {
  //const [rowData, setRowData] = useState(rows);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [totalSum, setTotalSum] = useState(0);
  //const [transactions, setTransactions] = useState('')
  async function remove(_id){
    const token = Cookies.get('token')
    if(!window.confirm("Are you sure you want to delete?")){
      return
    }
    const res = await fetch(`http://localhost:4000/transaction/${_id}`, {
      method: "DELETE",
      headers:{
      
        Authorization: `Bearer ${token}`,
      }
    });
    if(res.ok){
      fetchTransactions() //updates and refetches transactions to display on table
      window.alert("successfully deleted")
    }
  }

  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.amount > b.amount? 1 : b.amount > a.amount ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0
        );
    }
    
  };
  function formatDate(date){
    return dayjs(date).format("DD-MMM, YYYY")
  }
 
  useEffect(() => {
    const total = transactions.reduce((acc, row) => acc + row.amount, 0);
    setTotalSum(total)
  }, [transactions]);

  
  

  const handleSortRequest = (e) => {
   
    
    //setTransactions(sortArray(transactions, orderDirection));
    
    sortArray(transactions, orderDirection)
    
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    
    
  };
  
  return (
    <>
    <Typography sx={{marginTop: 5, boxShadow: 2}} variant ="h6" className='transactions'>Transactions</Typography>
    <TableContainer component={Paper} sx={{marginTop:2}} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead >
          <TableRow >
          
            <TableCell align="left" onClick={handleSortRequest}>
            <TableSortLabel active={true} direction={orderDirection}>
              Amount
              </TableSortLabel>
            </TableCell>
            {/* <TableSortLabel
              active={orderBy === transactions.id}
              direction={orderBy === transactions.id ? order : 'asc'}
              onClick={createSortHandler(transactions.id)}
            >
              {transactions.label}
              {orderBy === transactions.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="right">Actions</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.amount}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{formatDate(row.date)}</TableCell>
              <TableCell align="right">
              <IconButton 
                  color="inherit" 
                  component="label"
                  onClick={()=>setEditTransaction(row)}
                >
                
                   <EditRoundedIcon/>
                </IconButton >
                {/* iconbutton makes it clickable */}
                <IconButton 
                  color="primary" 
                  component="label"
                  onClick={()=> remove(row._id)}
                >
      
                    <DeleteForeverRoundedIcon/>
                </IconButton >
                
              </TableCell>

            
            
            </TableRow>

         
          ))}

            {/* for calculating sum */}
            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={2} align="right">Total</TableCell>
              <TableCell align="right">{totalSum}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}