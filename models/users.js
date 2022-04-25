import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  fName:  {type:String,required:true}, 
  lName:  {type:String,required:true}, 
  email:  {type:String,required:true,unique:true}, 
  password:  {type:String,required:true}, 
  
 
},{timestamps:true});
mongoose.models={};
export default mongoose.model('User',userSchema);