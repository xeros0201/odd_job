import mongoose from "mongoose";


const schema = new mongoose.Schema({

  email:{
    type:String,
    minlength:6,
    maxlength:30
  },
  phone:{
    type:Number,
    min:8,
    max:20
  },
  role:{
    type:String,
    enum:['admin','vendor','customer']
  },
  status:{
    type:String,
    enum:['Activated','Suspended','Deleted','Deactivated']
  },
  transaction_history:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Transaction"
  }
},{timestamps:true})
export const AccountModel = mongoose.model("Account",schema)