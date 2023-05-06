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

router.get('/category-sum', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
     
      const categories = ['Shopping', 'Bills', 'Food', 'Entertainment', 'Investing', 'Hobbies', 'Misc'];
      const result = await Transaction.aggregate([
        { $match: { 'categories.label': { $in: categories }, user_id: req.user._id  } }, // Only consider transactions with one of the specified categories with the current user's user_id
        { $group: { _id: '$categories.label', category_sum: { $sum: '$amount' } } }, // Group by category and sum amounts
        { $project: { category: '$_id', category_sum: 1, _id: 0 } } // Format result to match obj format
      ]);
      res.json({data: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
export default router;
