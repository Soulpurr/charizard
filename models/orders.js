import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId:  {type:String,required:true}, // String is shorthand for {type: String}
  product: [{ productId: {type:String,required:true}, quantity: {type:String,required:true} }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  address: {type:String,required:true},
  amount: {type:Number,required:true},
  status: {type:String,default:'Pending',required:true},
},{timestamps:true});
mongoose.models={};
export default mongoose.model('order',orderSchema);