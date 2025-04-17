import ErrorHandler from "../middlewares/error.js";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";



export const UserRegister = async(req,res,next) => {
    const {name,email,password,phone} = req.body;
    console.log("Reg Api")
    if (!name || !email || !password || !phone) {
        return next(new ErrorHandler("All Fields Required"))
    }
    try {
        // const isEmail = userModel.find({email});
        // if (isEmail) {
        //     return next(new ErrorHandler("Email Already Register!!!"))
        // }

        const user = await userModel.create({
            name,
            email,
            phone,
            password
        })

        await user.save();
        return res.json({sucess:true, user})
    } catch (error) {
        console.log(error.message)
    }

}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email ,password"));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    // const isPasswordMatched = await user.comparePassword(password);
    // if (!isPasswordMatched) {
    //   return next(new ErrorHandler("Invalid Email Or Password !", 400));
    // }
    // if (user.role !== role) {
    //   return next(
    //     new ErrorHandler(`User with provided email and ${role} not found !`, 404)
    //   );
    // }
    // sendToken(user, 201, res, "User Logged In Sucessfully !");
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
    res.cookie("token", token);
    return res.json({success:true, user})
  };
  
  // export const logout = async (req, res, next) => {
  //   res
  //     .status(201)
  //     .cookie("token", "", {
  //       httpOnly: true,
  //       expires: new Date(Date.now()),
  //     })
  //     .json({
  //       success: true,
  //       message: "Logged Out Successfully !",
  //     });
  // };
  
  
  // export const getUser = catchAsyncErrors((req, res, next) => {
  //   const user = req.user;
  //   res.status(200).json({
  //     success: true,
  //     user,
  //   });
  // });