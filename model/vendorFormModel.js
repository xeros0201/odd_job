import mongoose from "mongoose";


const schema = new mongoose.Schema({
  vendor_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  },
  status: {
    type:String,
    enum: ['Pending','Approved','Rejected']
  },
  vendor_address: {
    type:String,
    required:true
  },
  business_desc: {
    type:String,
  },
  id_card_number: {
    NumberID: {
      type: Number,
      required: true
    },
    TaxNumber: {
      type: Number,
      required: true
    },
    front_image: {
      type: String,
      required: true
    },
    back_image: {
      type: String,
      required: true
    },
  },


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
export const VendorFormModel = mongoose.model("VendorForm",schema)