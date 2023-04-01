import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import Transaction from './models/Transaction.js'
dotenv.config()
const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())
   
 await mongoose.connect(process.env.REACT_APP_ATLAS_URI)
 console.log("connection successful")


app.get('/', (req,res)=>{
    res.send("hello world")
});
app.get('/transaction', async (req, res)=>{ //finds everything in db
    const transaction= await Transaction.find({})
    res.json({data: transaction})

})
app.post('/transaction', async (req,res)=>{
    const {amount,description,date} = req.body
    const transaction = new Transaction({
        amount,
        description,
        date,
    });
    await transaction.save()
    res.json( {message: "sucessfully saved transaction"})
});
app.listen(PORT, ()=>{
    console.log("server is running at http://localhost:4000")
})