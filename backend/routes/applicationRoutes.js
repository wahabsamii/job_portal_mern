import express from "express";
import {
  employerGetAllApplications,
  GetAllApplication,
  getSeekerAppliedJobs,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
// import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post",isAuthenticated,upload.single("resume"), postApplication);
router.get("/employer/getall", employerGetAllApplications);
router.get("/jobseeker/getall", jobseekerGetAllApplications);

// get all application
router.get("/all/application", GetAllApplication);
router.get("/my/application/:id", getSeekerAppliedJobs);
router.delete("/delete/:id", jobseekerDeleteApplication);

export default router;