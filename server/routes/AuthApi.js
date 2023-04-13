import {Router} from "express"
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router= Router();

router.post('/register', async (req,res)=>{
    //get form data
   
    //check if user exists
    const {email, password, firstName, lastName} = req.body; //destructure data from req body
    console.log("req email before try: ", email)
    try{
        const userExists = await User.findOne({email: req.body.email})
        console.log('req email is: ', req.body.email)
        console.log('user is: ',userExists)
        if (userExists){
            res.status(406).json({message:"User already exists"})
            console.log('email is already in use')
            return
        }
    }
    catch(err){
        console.log(err)
    }
    // const user = await User({email, password, firstName, lastName})
    // const savedUser= user.save()
    // console.log(user)

    //hash pw since the user is new
    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPw = await bcrypt.hashSync(password, salt)
    console.log(hashedPw)
    const user = await User({ //create user with the hashed pw
        email,
        password: hashedPw,
        firstName,
        lastName,
    })
    await user.save() //saved to db
    

    //

    console.log('user saved')
    res.status(201).json({message:"user created"})
})

router.post('/login', async (req,res)=>{
    const {email, password}= req.body
    const userExists = await User.findOne({email: req.body.email})
    if (!userExists){
        res.status(406).json({message:"password not found"})
        //console.log('email is already in use')
        return
    }
    //verify users password
    const matched = await bcrypt.compare(password, userExists.password)
    if (!matched){
        res.status(406).json({message: "password does not match"})
    }
    //create jwt token
    const token = jwt.sign({},"some secret.")
    console.log(token)
    res.json({message: 'successfully logged in', token})
})
export default router