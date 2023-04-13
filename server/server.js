import express from 'express'

import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import TransactionRoutes from './routes/transaction.js'
import AuthApi from './routes/AuthApi.js'

import connect from './database/mongodb.js'
dotenv.config()
const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send("hello world")
});

app.use("/transaction", TransactionRoutes)
app.use("/auth", AuthApi)

 


await connect()

app.listen(PORT, ()=>{
    console.log("server is running at http://localhost:4000")
})