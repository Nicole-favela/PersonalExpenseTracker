import {Router} from 'express'
import Transaction from "../models/Transaction.js"

const router = Router();

router.get('/', async (req, res)=>{ //finds everything in db and sorts from reverse order to show latest one first
    const transaction= await Transaction.find({}).sort({createdAt: -1})
    res.json({data: transaction})

})
router.post('/', async (req,res)=>{
    const {amount,description,date} = req.body
    const transaction = new Transaction({
        amount,
        description,
        date,
    });
    await transaction.save()
    res.json( {message: "sucessfully saved transaction"})
});

export default router;
