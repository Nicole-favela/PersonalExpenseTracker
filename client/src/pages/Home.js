import React from 'react'

import { TransactionForm } from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList.js";
import Container from '@mui/material/Container'

import  {useState, useEffect} from "react"
import Cookies from 'js-cookie'
import PieChart from '../components/PieChart.js';
const InitialValue = [
  { category: '', 
  category_sum: 1,
   } 
]
export default function Home () {
const [editTransaction, setEditTransaction] = useState({})
const [dataSum, setDataSum] = useState(InitialValue)
  const [transactions,setTransactions]= useState([])
  function reload(res){
    if(res.ok){
      
      fetchTransactions()
    
    }
  }
  useEffect(()=>{
    fetchTransactions()
  },[])

  async function fetchTransactions(){ //default GET
    const token = Cookies.get('token')
    const res = await fetch('https://expense-tracker-backend-30hw.onrender.com/transaction',{
       headers:{
        Authorization: `Bearer ${token}`,
       }

    })//fetches data
    const {data} = await res.json();
    setTransactions(data)
    console.log('right after fetching transactions !!!')

  }
  
  
  return (
    <>
    <Container>
    <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
      <TransactionsList transactions={transactions} fetchTransactions={fetchTransactions} setEditTransaction={setEditTransaction}/>
      <PieChart fetchTransactions={fetchTransactions} transactions={transactions}/>
      </Container>
    

     </>
  )
}
