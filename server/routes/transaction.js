import {Router} from 'express'
import Transaction from "../models/Transaction.js"
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res)=>{ //finds everything in db and sorts from reverse order to show latest one first
    const transaction= await Transaction.find({ user_id: req.user._id }).sort({createdAt: -1})
    res.json({data: transaction})

})
router.post('/', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    const {amount,description,date, categories} = req.body
    // const categories = [
    //     {label: 'Shopping'},
    //     {label: 'Investing'},
    //     {label: 'Bills'},
    //     {label: 'Clothing'},
    
    // ]
    console.log('the categories before saving: ', categories)
     
    const transaction = new Transaction({
        amount,
        description,
        user_id: req.user._id,
        date,
        categories: categories,
        
    });
    await transaction.save()
    res.json( {message: "sucessfully saved transaction"})
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res)=>{ //
    // console.log(req.params.id)//for testing
    await Transaction.findOneAndDelete({_id: req.params.id})
    res.json({message: "deleted successfully"})

})

//for updating
router.patch('/:id', passport.authenticate('jwt', {session: false}), async (req, res)=>{ //
    await Transaction.updateOne({_id: req.params.id},{ $set: req.body })
    res.json({message: "updated successfully"})

})
export default router;
