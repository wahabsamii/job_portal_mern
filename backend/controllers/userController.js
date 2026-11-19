import ErrorHandler from "../middlewares/error.js";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypts from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';

export const UserRegister = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.json({
      success: false,
      message: "All Fields Required",
    });
  }

  try {
    const isEmail = await userModel.findOne({ email });

    if (isEmail) {
      return res.json({
        success: false,
        message: "Email Already Registered!",
      });
    }

    const hashedPassword = await bcrypts.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      phone,
      password:hashedPassword,
    });

    return res.json({
      success: true,
      user,
      message: "Account Created!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email ,password"));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await bcrypts.compare(password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password !", 400));
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    return res.json({success:true, user})
  };
  
  export const logout = async (req, res, next) => {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully !",
      });
  };
  

export const updateProfile = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const image = req.file;
  try {
    const user = req.user;

    let imageUrl = user.image;

    // Upload new image if provided
    if (image) {
      console.log("Image received:", image);

      const uploadImage = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });

      imageUrl = uploadImage.secure_url;

      console.log("Cloudinary image URL:", imageUrl);
    }

    const updateData = {
      name,
      email,
      phone,
      image: imageUrl,
    };

    if (password) {
      updateData.password = await bcrypts.hash(password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
