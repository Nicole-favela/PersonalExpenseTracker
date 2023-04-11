
//import { Container } from "@mui/system";
import React , {useState, useEffect} from "react"
//import Transaction from "../../server/models/transaction";
import AppBar from '../components/AppBar';
import { TransactionForm } from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList.js";
import Container from '@mui/material/Container'
//import Form from "..components/Form.js"

function App() {

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
    <div>
      <AppBar/>
      <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction}/>
      <Container>
      <TransactionsList transactions={transactions} fetchTransactions={fetchTransactions} setEditTransaction={setEditTransaction}/>
      </Container>
      
      {/* <form onSubmit={handleSubmit}>
        <input 
          type= "number" 
          value = {form.amount}
          name="amount"
          onChange= {handleInput}
          placeholder = "Enter a transaction amount"/>
        <input 
          type= "text" 
          name= "description" 
          value={form.description}
          onChange={handleInput}
          placeholder = "enter a transaction details"/>
        <input 
          type= "date" 
          name="date"
          value={form.date}
          onChange={handleInput}
          />
        <button type= "submit">Submit</button>

        </form>

        show all transactions in a table */}
        <br/>
      {/* <section>
        <table>
          <thead>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((trx)=>(
                <tr key = {trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                <td>{trx.date}</td>
              </tr>


            ))}
          
          </tbody>

          
        </table>
      </section> */}

     
    </div>
  );
}

export default App;
