import mongoose from "mongoose";


const schema = new mongoose.Schema({
  vendor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
  },
  customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
  },
  service_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
  },
  job_address:{
    type:String,
    required:true
  },
  transaction_status:{
    type:String,
    enum:['Pending Confirmation','Standby','Traveling','Working','Completed','Canceled']
  },
  feedback_from_vendor:{
    type:String,
  },
  feedback_from_customer:{
      type:String,
  }




},{timestamps:true})
export const TransactionModel = mongoose.model("Transaction",schema)