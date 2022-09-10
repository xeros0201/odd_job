import mongoose from "mongoose";


const schema = new mongoose.Schema({
  name: {
    type: String,
  }

},{timestamps:true})
export const ReportTypeModel = mongoose.model("ReportType",schema)