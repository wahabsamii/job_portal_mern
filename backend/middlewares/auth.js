import userModel from "../models/userSchema.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);

  next();
};

export const isAdmin = async (req,res,next) => {
    try {
      const {role} = req.user;
      if(role !== "Emplooye"){
        return res.status(404).json({message:"Access Denied! Only Our Emplooye Allow."})
      }
      next()
    } catch (error) {
      console.error("Admin Middleware Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
      
    }
}