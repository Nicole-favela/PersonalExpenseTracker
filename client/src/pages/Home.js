import React from 'react'
import AppBar from '../components/AppBar';
import { TransactionForm } from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList.js";
import Container from '@mui/material/Container'
import {Outlet} from "react-router-dom"
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
      //setForm(InitialForm)//clears input fields
      fetchTransactions()
      //fetchSum()
      // fetchTransactions() // updates transactions in real time (without reload)
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
  // useEffect(()=>{
  //   fetchSum()
  //   //fetchTransactions()
  // },[])

  // //for summing category amounts 
  // async function fetchSum(){
  //   const token = Cookies.get('token')
  //   const res = await fetch('http://localhost:4000/transaction/category-sum',{
  //      headers:{
  //       Authorization: `Bearer ${token}`,
  //      }

  //   })//fetches data

    
  //   const {data} = await res.json();
  //   console.log("data from sums is: ", data)
  //   setDataSum(data)
  //   // console.log("data sum after being set is : ", dataSum)
  //   // reload(res)
  //   // console.log('in home component after reaload')


  // }
  
  
  return (
    <>
    <Container>
    <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} transactions={transactions} />
      <TransactionsList transactions={transactions} fetchTransactions={fetchTransactions} setEditTransaction={setEditTransaction}/>
      <PieChart fetchTransactions={fetchTransactions} transactions={transactions}/>
      </Container>
    

     </>
  )
}
