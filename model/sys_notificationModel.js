import mongoose from "mongoose";


const schema = new mongoose.Schema({

action: {
  type: String,
  enum:['created','updated']
}
,
at:{
type:String
},
status:{
type:String,
enum:["Unreaded","Readed"],
default:"Unreaded"
},
isNewNoti:{
type:Boolean,
default:true
},

from: {
  type:mongoose.Schema.Types.ObjectId,
  ref:"Account",
  required:true
},


},{timestamps:true})
export const SysNotiModel = mongoose.model("sysNotification",schema)