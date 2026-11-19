
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from 'cloudinary';
import path from 'path'


export const getAllJobs =async (req, res, next) => {
 try {
   const jobs = await Job.find({ expired: false });
   res.status(200).json({
      success: true,
      jobs,
    });
 } catch (error) {
   return res.json({success: false, message: error.message});
 }
};

export const postJob = async (req, res, next) => {
  // const { role } = req.user;
  // if (role === "Job Seeker") {
  //   return next(
  //     new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
  //   );
  // }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy
  } = req.body;
  // const image = req.file;
  // if (!req.file) {
  //   return res.status(400).json({ success: false, message: "Image file is required!" });
  // }
  // console.log("bk image my",req.file.image)
  // if (!title || !description || !category || !country || !city || !location) {
  //   return next(new ErrorHandler("Please provide full job details.", 400));
  // }

  // if ((!salaryFrom || !salaryTo) && !fixedSalary) {
  //   return next(
  //     new ErrorHandler(
  //       "Please either provide fixed salary or ranged salary.",
  //       400
  //     )
  //   );
  // }

  // if (salaryFrom && salaryTo && fixedSalary) {
  //   return next(
  //     new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
  //   );
  // }
  // const postedBy = req.body.id;
  // console.log("POSTED", req.body)


  /// upload image to cloudinary
  // const imageUpload = cloudinary.uploader.upload(image.path, {resource_type:'image'});
  // const imageUrl = await imageUpload.secure_url;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
    // image: imageUrl
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
};

export const getMyJobs = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
};

export const updateJob = async (req, res, next) => {
  // const { role } = req.user;
  // if (role === "Job Seeker") {
  //   return next(
  //     new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
  //   );
  // }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // console.log("jobbbb",job)
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
};

export const deleteJob = async (req, res, next) => {
  // const { role } = req.user;
  // if (role === "Job Seeker") {
  //   return next(
  //     new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
  //   );
  // }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
};

export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
};