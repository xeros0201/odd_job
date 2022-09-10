import mongoose from "mongoose";


const schema = new mongoose.Schema({

  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  },
  rating:{
    type:Number,
    min:0,
    max:5
  },
  review_desc:{
    type:String
  }


},{timestamps:true})
export const ServiceReviewModel = mongoose.model("ServiceReview",schema)