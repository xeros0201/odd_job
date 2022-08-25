import express from "express";
import {createUser,createUserAdmin,loginUser,refreshToken,updateUser,userLogout} from '../controller/authController.js'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController.js'
import { forgotPass } from "../controller/userController.js";
const routerAuth = express.Router()

routerAuth.post("/register",createUser)
routerAuth.post("/login",loginUser)
routerAuth.post("/refresh",refreshToken)
routerAuth.post("/logout",verifyToken,userLogout)
routerAuth.post("/adminRe",createUserAdmin)
routerAuth.post("/update/:id",updateUser)
routerAuth.post("/repassword",forgotPass)
export default routerAuth
