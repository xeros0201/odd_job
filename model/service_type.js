import mongoose from "mongoose";


const schema = new mongoose.Schema({

  type_name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  admin_author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  }


},{timestamps:true})
export const ServiceTypeModel = mongoose.model("ServiceType",schema)