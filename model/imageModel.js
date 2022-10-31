import mongoose from "mongoose";


const schema = new mongoose.Schema({
name:{
  type:String
},
img:{
  data:Buffer,
  contentType:String
}, 
},{timestamps:true})
export const ImageModel = mongoose.model("Image",schema)