import express from 'express';
import { login, UserRegister } from '../controllers/userController.js';

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", login);

export default router