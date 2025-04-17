import express from "express";
import {deleteJob,getAllJobs,getMyJobs,getSingleJob,postJob,updateJob} from "../controllers/jobConntroller.js";
import upload from "../middlewares/multer.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post",upload.single("image"),isAdmin, postJob);
router.get("/getmyjobs", getMyJobs);
router.put("/update/:id", updateJob);
router.delete("/delete/:id", deleteJob);
router.get("/getone/:id", getSingleJob);

export default router;