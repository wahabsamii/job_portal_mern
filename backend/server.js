import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js';
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import cookieParser from 'cookie-parser';
// import http from 'http';
// import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' }
// });

const port = process.env.PORT || 4000;
const allowedOrigins = [
  'http://localhost:3000', // your local frontend
  'https://eman-accessories.vercel.app', // your deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you are sending cookies
};

app.use(cors(corsOptions));

await mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database connected success'));
connectCloudinary();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("Hello from job nova back")
});

// let userCount = 0;

// io.on('connection', (socket) => {
//   userCount++;
//   io.emit('userCount', userCount);

//   socket.on('disconnect', () => {
//     userCount--;
//     io.emit('userCount', userCount);
//   });
// });

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);

// app.listen(4000,()=> console.log('server 4000'))
// app.listen(4000, () => console.log('Server running with socket.io on port 4000'));

export default app;