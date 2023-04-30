import mongoose from 'mongoose'
const {Schema} =mongoose;

const transactionSchema = new Schema({
    amount: Number,
    description: String,
    user_id: mongoose.Types.ObjectId, //added to associate user with their transactions
    categories: {label: String},
    date: {type: Date, default: new Date()},
    createdAt: {type: Date, default: Date.now},

})
export default new mongoose.model('Transaction', transactionSchema)
