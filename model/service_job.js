import mongoose from "mongoose";


const schema = new mongoose.Schema({

  vendor_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  },
  average_rating:{
    point:{
      type:Number,
    },
    service_listing_review:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"ServiceReview"
    }]
  },
  price:{
    type:Number,
    min:0,
    required:true
  },
  service_name:{
    type:String,
    required:true
  },
  description:{
    type:String,
  },
  image:{
    type:String 
  }
  
},{timestamps:true})
export const ServiceModel = mongoose.model("Service",schema)