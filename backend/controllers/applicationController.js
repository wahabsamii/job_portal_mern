import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = async (req, res, next) => {
    try {
      const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }
  
      // console.log("Received Files:", req.file);
      // console.log("Received Body:", req.body);
  
      if (!req.file) {
        return next(new ErrorHandler("Resume File Required!", 400));
      }
  
      const resume = req.file;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      
      // Validate File Format (Optional)
      if (!allowedFormats.includes(resume.mimetype)) {
        return next(
          new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
        );
      }
  
      // ✅ Use `resume.path` instead of `resume.tempFilePath`
      const cloudinaryResponse = await cloudinary.uploader.upload(resume.path);
  
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed to upload Resume to Cloudinary", 500)
        );
      }
  
      const { name, email, coverLetter, phone, address, jobId } = req.body;
      if (!jobId || jobId === "undefined") {
        return next(new ErrorHandler("Job not found!", 404));
      }
  
      const jobDetails = await Job.findById(jobId);
      if (!jobDetails) {
        return next(new ErrorHandler("Job not found!", 404));
      }
  
      const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
      };
  
      const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
      };
  
      if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
      ) {
        return next(new ErrorHandler("Please fill all fields.", 400));
      }
  
      const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
      });
    } catch (error) {
      console.error("Unhandled Error:", error);
      next(new ErrorHandler("Something went wrong!", 500));
    }
  };
  

export const employerGetAllApplications = async(req, res, next) => {
    // const { role } = req.user;
    // if (role === "Job Seeker") {
    //   return next(
    //     new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    //   );
    // }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }


  export const GetAllApplication = async (req, res) => {
    try {
      const allApplications = await Application.find({}); 
      return res.json({ success: true, applications: allApplications });
    } catch (error) {
      console.error("Error fetching applications:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
export const jobseekerGetAllApplications = 
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }

export const jobseekerDeleteApplication = 
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }

export const getSeekerAppliedJobs = async(req,res,next) => {
  const {id} = req.body;
  // console.log("API TOUCHING ", email)
  try {
    const specific = await Application.find({ "applicantID.user": id });
  if (!specific.length) {
    return res.status(404).json({ message: "No jobs found for this user." });
  }

  res.status(200).json(specific);
  } catch (error) {
    console.log(error);
  }
}