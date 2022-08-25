import express from "express";
import {getAllUser,deleteUser, getAllAdmin, findUser} from '../controller/userController.js'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController.js'
import { createBill, getAllBill } from "../controller/billController.js";
const router = express.Router()

router.get("/",getAllUser)


router.post("/delete/:id",verifyTokenAndUser,deleteUser)
router.post('/bill',createBill)
router.get('/getAllBill',getAllBill)
router.get('/admin',getAllAdmin)
router.post('/find/:id',verifyTokenAndUser,findUser)
export default router
