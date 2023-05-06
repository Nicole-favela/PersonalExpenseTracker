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

// app.get('/shopping-sum', async (req, res) => {
//     try {
//        const results = await Transaction.aggregate([
//           { $match: { 'categories.label': 'Shopping' } },
//           { $group: { _id: null, total: { $sum: '$amount' } } }
//        ]);
//        res.json({ sum: results[0].total });
//     } catch (error) {
//        console.error(error);
//        res.status(500).send('An error occurred');
//     }
//  });




export default router