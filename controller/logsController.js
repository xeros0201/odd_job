import { ModerationLogModel } from "../model/moderationLog.js"


export const createLogs = async (mess,status_before,status_after,from,to )=>{
  
 try {
  const newLogs = await new ModerationLogModel({
    message:mess,
    status_before:status_before,
    status_after:status_after,
    from:from,
    to:to
  })
  
   await newLogs.save()
 } catch (error) {
  return console.log(error)
 }

}