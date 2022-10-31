import express from "express";

import { verifyTokenAdmin } from "../controller/middlewareController.js";
import { createReportType, createServiceType, uploadImage } from "../controller/utility.js";

const router = express.Router()

router.post('/create_report_type',verifyTokenAdmin,createReportType)
router.post('/create_service_type',verifyTokenAdmin,uploadImage,createServiceType)


export default router