import express from 'express'

import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import TransactionRoutes from './routes/transaction.js'
import AuthApi from './routes/AuthApi.js'
import passport from 'passport'
import passportConfig from'./config/passport.js'

import connect from './database/mongodb.js'
import UserApi from './routes/UserApi.js'

dotenv.config()

const PORT = process.env.PORT || 3030;;
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize()) //
passportConfig(passport) //passport instance passed in

app.get('/', (req,res)=>{
    res.send("hello world")
});

app.use("/transaction", TransactionRoutes)
//app.use("/transaction/category-sum", TransactionRoutes)
app.use("/auth", AuthApi)
app.use("/user", UserApi)

 


await connect()

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})