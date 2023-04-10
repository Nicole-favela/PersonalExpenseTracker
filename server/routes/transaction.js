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

router.delete('/:id', async (req, res)=>{ //
    // console.log(req.params.id)//for testing
    await Transaction.findOneAndDelete({_id: req.params.id})
    res.json({message: "deleted successfully"})

})

//for updating
router.patch('/:id', async (req, res)=>{ //
    await Transaction.updateOne({_id: req.params.id},{ $set: req.body })
    res.json({message: "updated successfully"})

})
export default router;
