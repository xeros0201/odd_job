import mongoose from "mongoose";


const schema = new mongoose.Schema({

message: {
  type: String,
},
status_before: {
  type: String,
},
status_after: {
  type: String,
},
from: {
  type:mongoose.Schema.Types.ObjectId,
  ref:"Account",
  required:true
},
to: {
  type:mongoose.Schema.Types.ObjectId,
  ref:"Account",
  required:true
}

},{timestamps:true})
export const ModerationLogModel = mongoose.model("ModerationLog",schema)