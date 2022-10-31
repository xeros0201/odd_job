import express from "express";
import { createAccount, createVendorForm, findVendorForm, getAllAccount, getByIdAcc, loginOut, loginUser, refreshToken } from "../controller/accountController.js";
import { verifyRefreshToken, verifyToken, verifyTokenParams, verifyTokenVendor } from "../controller/middlewareController.js";
import { uploadID } from "../controller/utility.js";
import { sendVerifyRe, verifyTokenFirst } from "../controller/verifyController.js";
const router = express.Router()

router.post('/login',loginUser)
router.post('/logout',verifyToken,loginOut)
router.post('/',createAccount)
router.get('/verify_account',verifyTokenFirst)
router.post('/get_accounts',getAllAccount)
router.get('/get-one/:user_id',verifyTokenParams,getByIdAcc)
router.post('/vendor',verifyTokenVendor,uploadID.fields([{name:'front_image', maxCount:1},{name:'back_image', maxCount:1}]),createVendorForm)
router.get('/get_vendor_from',verifyTokenVendor,findVendorForm)
router.post("/activate_account",verifyToken,sendVerifyRe)
router.post('/refresh',verifyRefreshToken,refreshToken)
export default router