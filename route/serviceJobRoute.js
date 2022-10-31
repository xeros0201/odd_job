import express from "express";

import { verifyTokenAdmin, verifyTokenVendor } from "../controller/middlewareController.js";
import { createServiceJob } from "../controller/service_jobController.js";
import {  uploadImage } from "../controller/utility.js";

const router = express.Router()

router.post('/',verifyTokenVendor,uploadImage,createServiceJob)



export default router