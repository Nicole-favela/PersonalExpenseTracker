import {Router} from "express"
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import passport from "passport";
dotenv.config()

const router= Router();

router.get('/', passport.authenticate("jwt", {session: false}), (req,res)=>{
    //authenticate token, and get user from request
   
    res.json({user: req.user})
})


export default router