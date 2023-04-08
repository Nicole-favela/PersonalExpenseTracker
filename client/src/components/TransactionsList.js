import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableSortLabel } from '@mui/material';
import {useState} from 'react'



export default function TransactionsList({transactions}) {
  //const [rowData, setRowData] = useState(rows);
  const [orderDirection, setOrderDirection] = useState("asc");

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

  const handleSortRequest = () => {
    //setTransactions(sortArray(transactions, orderDirection));
    sortArray(transactions, orderDirection)
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };
  
  return (
    <TableContainer component={Paper} sx={{marginTop:10}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          
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
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Date</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.amount}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            
            </TableRow>
          ))}

          {/* for sum */}
          {/* <TableRow className={classes.finalRow}>
           <TableCell align="right" colSpan={4}>
             <b>Total Cost:</b> ${totalCost}
           </TableCell>
         </TableRow> */}


        </TableBody>
      </Table>
    </TableContainer>
  );
}