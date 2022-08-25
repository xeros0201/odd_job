import { RefreshPassword } from "../model/refreshpassword.js"
import { UserModel } from "../model/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv  from "dotenv"
import nodemailer from 'nodemailer'
dotenv.config()
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
        const email = "ledinhhoangkhai@gmail.com" 
        if(!email) return res.status(500).json("Invalid email")
    
       const user = await UserModel.findOne({"email":email})
       if(!user)return res.status(500).json("User not found")
       const token = await RefreshPassword.findOne({owner: user._id})
       if(token)return res.status(500).json("Link đổi mật khẩu đã được gửi qua mail của bạn !")
       const salt = await bcrypt.genSalt(10)
 
       const t = await bcrypt.hash( Math.floor(Math.random() * 30).toString(),salt)
       const newT = t.toString('hex')
      
       const resetToken = new RefreshPassword({owner:user._id,token:newT})
       await resetToken.save()

  let transport =  nodemailer.createTransport('SMTP',{
    service:"Gmail" ,
    host: "smtp.gmail.com",
    port: 587,
    requiresAuth: true,
    secureConnection: false,
    domains: ["gmail.com", "googlemail.com"],
    auth: {
        user: "booking@phobendoi.art",
        pass: "rxhkygwziwpaaara",
    },
    tls:{
        rejectUnauthorized:false
    }
})
    
    const options = {
        from: "booking@phobendoi.art",
        to: "ledinhhoangkhai@gmail.com",
        subject: "reset password",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>forgot password</title>
</head>
<body>
<h1>Bấm vào link bên dưới để đổi lại mật khẩu</h1>
<a href="http://localhost:3000/reset-password?token=${newT}&id=${user._id}"></a>
</body>
</html>
        `,
        
    }
    await transport.sendMail(options)
   return res.status(200).json("success")
    } catch (error) {
        console.log({error})
        return res.status(500).json(error)
    }
  
}
