import React from 'react'
import AppBar from '../components/AppBar';
import { TransactionForm } from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList.js";
import Container from '@mui/material/Container'
import {Outlet} from "react-router-dom"
import  {useState, useEffect} from "react"

export default function Home () {
const [editTransaction, setEditTransaction] = useState({})
  const [transactions,setTransactions]= useState([])
  useEffect(()=>{
    fetchTransactions()
  },[])

  async function fetchTransactions(){ //default GET
    const res = await fetch('http://localhost:4000/transaction')//fetches data
    const {data} = await res.json();
    setTransactions(data)
    console.log(transactions)

  }
  
  return (
    <>
    <Container>
    <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction}/>
      <TransactionsList transactions={transactions} fetchTransactions={fetchTransactions} setEditTransaction={setEditTransaction}/>
      </Container>
    

     </>
  )
}
