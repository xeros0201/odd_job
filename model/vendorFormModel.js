import mongoose from "mongoose";


const schema = new mongoose.Schema({
  vendor_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  },
  status: {
    type:String,
    enum: ['Pending','Approved','Rejected'],
    default:"Pending"
  },
  vendor_address: {
    type:String,
    required:true
  },
  business_desc: {
    type:mongoose.Schema.Types.Mixed,
  },
  NumberID: {
    type: Number,
      required:true
  },
  
  TaxNumber: {
    type: Number,
      required:true
  },
  front_image: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Image",
    required:true
  },
  back_image: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Image",
    required:true
  },

  worker_list:[{
    
    worker_status:{
        type:String,
        enum:["available","busy","working"],
        default:"available"
    },
    worker:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
  }}],

  

},{timestamps:true})
export const VendorFormModel = mongoose.model("VendorForm",schema)