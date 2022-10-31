import jwt from 'jsonwebtoken'
import { AccountModel } from '../model/accountModel.js'
import { failedReq } from './utility.js'


export const verifyToken= async (req,res,next)=>{
    const token = req.headers.token
    
    if(token){
        const accessToken= token.split(" ")[1]
     
        jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
            if(err){
              return  res.status(403).json("Token is not valid")
            }
            
            const isUserValid = user.id==req.body._id
            if(!isUserValid) return  res.status(403).json("You not allow to do this !")
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You're not authenticated")  
    }
}
export const verifyRefreshToken= async (req,res,next)=>{
    const token = req.headers.token
    
    if(token){
        const accessToken= token.split(" ")[1]
     
        jwt.verify(accessToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
            if(err){
              return  res.status(403).json("Token is not valid")
            }
            
            const isUserValid = user.id==req.body._id
            if(!isUserValid) return  res.status(403).json("You not allow to do this !")
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You're not authenticated")  
    }
}
export const verifyTokenAdmin= async (req,res,next)=>{
    const token = req.headers.token
    try {
        if(token){
            const accessToken= token.split(" ")[1]
       
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                  return  res.status(403).json("Token is not valid")
                }
               
               
                if(user.role=="admin"){
                    
                    req.user = user;
                   next()
               
                }else if(user.role!=="moderator"){
                    req.user = user;
               
                     next()
                }else{
                    return res.status(404).json("Forbidden")
                }
              
               
            })
        }else{
            return res.status(401).json("You're not authenticated")  
        }
    } catch (error) {
        return res.status(500).json(error)  
    }
  
}
export const verifyTokenVendor= async (req,res,next)=>{
    const token = req.headers.token
    try {
        if(token){
            const accessToken= token.split(" ")[1]
       
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY, async(err,user)=>{
                if(err){
                  return  res.status(403).json("Token is not valid")
                }
               
               
                if(user.role=="vendor"){
                    const vendor = await AccountModel.findById(user.id)
                    if(!vendor) return failedReq(404,"User not found !",res)
                    if(vendor.status=="Activated"){
                        req.user = user;
                        next()
                    }else{
                        return failedReq(403,`You are ${vendor.status}`,res)
                    }
                  
          
                }else{
                    return res.status(404).json("Forbidden")
                }
              
               
            })
        }else{
            return res.status(401).json("You're not authenticated")  
        }
    } catch (error) {
        return res.status(500).json(error)  
    }
  
}



export const verifyTokenParams= async (req,res,next)=>{
    const token = req.headers.token
    
    if(token){
        const accessToken= token.split(" ")[1]
     
        jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
            if(err){
              return  res.status(403).json("Token is not valid")
            }
            
            const isUserValid = user.id==req.params.user_id
            if(!isUserValid) return  res.status(403).json("You not allow to do this !")
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You're not authenticated")  
    }
}


export const verifyTokenQuery= async (req,res,next)=>{
    const token = req.headers.token
    
    if(token){
        const accessToken= token.split(" ")[1]
     
        jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
            if(err){
              return  res.status(403).json("Token is not valid")
            }
            
            const isUserValid = user.id==req.query.id
            if(!isUserValid) return  res.status(403).json("You not allow to do this !")
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You're not authenticated")  
    }
}
