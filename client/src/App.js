
import React , {useState, useEffect} from "react"
//import Form from "..components/Form.js"

function App() {

  const [form, setForm] = useState({amount: 0, description: '', date: null})
  const [transactions,setTransactions]= useState([])
  useEffect(()=>{
    fetchTransactions()
  },[])
  async function fetchTransactions(){
    const res = await fetch('http://localhost:4000/transaction')//fetches data
    const {data} = await res.json();
    setTransactions(data)
    console.log(data)

  }
  function handleInput(e){ //used to set the form
    setForm({...form, [e.target.name]: e.target.value})
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
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        {/* show all transactions in a table*/}
        <br/>
      <section>
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
      </section>

     
    </div>
  );
}

export default App;
