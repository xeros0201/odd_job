// vendor_id:{
//   type:mongoose.Schema.Types.ObjectId,
//   ref:"Account",
//   required:true
// },
// average_rating:{
//   point:{
//     type:Number,
//   },
//   service_listing_review:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"ServiceReview"
//   }]
// },
// price:{
//   type:Number,
//   min:0,
//   required:true
// },
// service_name:{
//   type:String,
//   required:true
// },
// description:{
//   type:String,
// },
// image:{
//   type:String 
// }

import { ServiceModel } from "../model/service_job.js"
import { failedReq, successReq } from "./utility.js"

export const createServiceJob= async ()=>{
  try {
    const newJob = await new ServiceModel({...req.body,vendor_id:req.user.id,image:`https://api.bioklaw.tech/${req.file.path}`})
    await newJob.save()
    return successReq(200,newJob,res)
  } catch (error) {
    return failedReq(500,error,res)
  }
}