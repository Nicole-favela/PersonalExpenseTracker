import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import TransactionRoutes from './routes/transaction.js'
import Transaction from './models/Transaction.js'
dotenv.config()
const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send("hello world")
});

app.use("/transaction", TransactionRoutes)

 await mongoose.connect(process.env.REACT_APP_ATLAS_URI)
 .then(console.log("connection successful"))




app.listen(PORT, ()=>{
    console.log("server is running at http://localhost:4000")
})