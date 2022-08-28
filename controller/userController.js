import { RefreshPassword } from "../model/refreshpassword.js"
import { UserModel } from "../model/userModel.js"

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv  from "dotenv"
import nodemailer from 'nodemailer'

import { OAuth2Client } from 'google-auth-library'
dotenv.config()

const GOOGLE_MAILER_CLIENT_ID = '104950448289-6ln6mjnldvf2b2neupgtfkk7mufrct9i.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04H_zGTd3IQLsCgYIARAAGAQSNwF-L9IrZYH-7l1i6lzjtXSDfOAs2S301n--QCsnX4aCs2OMBQjNT1ydF1o-XDzORMs4a-YS26U'
const ADMIN_EMAIL_ADDRESS = 'info@phobendoi.art'


const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
  )
  myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
  })


export const getAllUser= async (req,res)=>{
    try {
        
        const user = await UserModel.find({"role":"client"})
        
        res.status(200).json(user)
    } catch (error) {
       return res.status(500).json({error:error})
    }
}

export const getAllAdmin= async (req,res)=>{
    try {
        
        const user = await UserModel.find({$or:[{"role":"admin"},{"role":"1"}]})
        
        res.status(200).json(user)
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
export const deleteUser= async (req,res)=>{
    try {
        
        const user = await UserModel.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Delete successfully")
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
export const findUser= async (req,res)=>{
    try {
            const role = req.body.role
        if(role==="client"){
            return res.status(500).json("You not allow to do this please contact the highest authorization admin for more infomation !")
        }else{
            const user = await UserModel.findById(req.params.id)
            if(role ==="admin" && user.role ==="admin" ){
                return res.status(500).json("You not allow to do this please contact the highest authorization admin for more infomation !")  
            }
            if(user.role ==="1"){
                return res.status(500).json("You not allow to do this please contact the highest authorization admin for more infomation !")
            }
            res.status(200).json(user)
        }

    
    } catch (error) {
       return res.status(500).json({error:error})
    }
}





  export const forgotPass = async (req,res)=>{
    try {
      const {email} = req.body
      if(!email) return res.status(500).json("Invalid email")
  
     const user = await UserModel.findOne({"email":email})
     if(!user)return res.status(500).json("User not found")
     const token = await RefreshPassword.findOne({owner: user._id})
     if(token)return res.status(500).json("Link đổi mật khẩu đã được gửi qua mail của bạn !")
     const salt = await bcrypt.genSalt(10)
        const thisT = Math.floor(Math.random() * 30).toString()
     const t = await bcrypt.hash(thisT ,salt)

    
     const resetToken = new RefreshPassword({owner:user._id,token:t})
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        await resetToken.save()
        const transport = nodemailer.createTransport({
          service: 'gmail',
          port:587,
          auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: GOOGLE_MAILER_CLIENT_ID,
            clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessTokenObject.token
          },
          
        })
      
      const options = {

          to: email,
          subject: "security",
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>forgot password</title>
          </head>
          <body>
          <h1>Bấm vào link bên dưới để đổi lại mật khẩu</h1>
          <a href="http://localhost:3000/re-password?token=${thisT}&id=${user._id}">Click here!</a>
          </body>
          </html>`,
  
      }
    
      
        await transport.sendMail(options)
        
         return res.status(200).json("success")
      } catch (error) {

        return res.status(500).json(error)
      }
}
 
export const verifyTokenRe = async (req,res ,next)=>{
  try {
    const {id ,token} = req.query
    
    if(!id||!token) return res.status(500).json("Invalid request")
    
   

   const user = await UserModel.findOne({"_id":id},{ password:0})
   if(!user)return res.status(500).json("User not found")
   const dbtoken = await RefreshPassword.findOne({owner: user._id})
   if(!dbtoken) return res.status(500).json("Không tìm thấy token !")  
    console.log("dbtoken",dbtoken.token)
    console.log("token",token)
    const salt = await bcrypt.genSalt(10)
    const thisT = token
 const t = await bcrypt.hash(thisT ,salt)
    if(!t===dbtoken.token)  return res.status(500).json("Not valid token !")
    req.user = user 
    next()

    } catch (error) {
      return res.status(500).json(error)
    }
}
export const verifyTokenFirst = async (req,res )=>{
  try {
    const {id ,token} = req.query
    
    if(!id||!token) return res.status(500).json("Invalid request")
    
   

   const user = await UserModel.findOne({"_id":id},{ password:0})
   if(!user)return res.status(500).json("User not found")
   const dbtoken = await RefreshPassword.findOne({owner: user._id})
   if(!dbtoken) return res.status(500).json("Không tìm thấy token !")  
    console.log("dbtoken",dbtoken.token)
    console.log("token",token)
    const salt = await bcrypt.genSalt(10)
    const thisT = token
 const t = await bcrypt.hash(thisT ,salt)
    if(!t===dbtoken.token)  return res.status(500).json("Not valid token !")

    
    return res.status(200).json(user)

    } catch (error) {
      return res.status(500).json(error)
    }
}
export const resetPass = async (req,res) =>{
  try{
    const  {password }=  req.body
    const user = await UserModel.findById(req.user._id)
    if(!user) return res.status(500).json("User not found !")
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password,salt)
     await UserModel.findByIdAndUpdate(user._id,{password:hashed})
     await RefreshPassword.findOneAndDelete({owner:user._id})
     res.status(200).json('success')
  }catch (err){
    res.status(500).json(err)
  }
 
   
}
