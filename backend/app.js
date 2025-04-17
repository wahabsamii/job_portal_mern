import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js';
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import cookieParser from 'cookie-parser';
const app = express();
await mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database connected success'));
connectCloudinary();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);


export default app;