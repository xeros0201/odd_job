import mongoose from "mongoose";


const schema = new mongoose.Schema({

  author_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  },
  target_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required:true
  },
  report_types: [
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"reportType",
   },
  ],
  description: {
    type:String,
    minlength: 10,
    maxlength: 500
  },

  response: {
    status: {
      type:String,
      enum: ['Pending','Rejected','Resolved']
    },
    evidence: {
      type:String
    },
    admin: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Account",
    }
  }
},{timestamps:true})
export const AbuseReportListModel = mongoose.model("AbuseReportList",schema)