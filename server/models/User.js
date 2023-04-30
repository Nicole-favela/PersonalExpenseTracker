import mongoose from 'mongoose'
const {Schema} =mongoose;

const userSchema = new Schema({
    firstName: {type: String,required:['firstName required']},
    lastName: {type: String,required:[ 'lastName required']},
    email: {type: String,required:['email required']},
    password: {type: String,required:['pw required']},
   
     
    
}, {timestamps:true})
export default new mongoose.model('User', userSchema)
