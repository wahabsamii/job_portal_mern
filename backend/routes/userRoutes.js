import express from 'express';
import { login, updateProfile, UserRegister } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", login);
router.put(
  "/update-profile",
  isAuthenticated,
  upload.single("image"),
  updateProfile
);
export default router