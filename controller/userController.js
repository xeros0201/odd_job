import { UserModel } from "../model/userModel.js"


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
