# JobNova – Job Portal (MERN Stack)

JobNova is a full-stack job portal application built using the MERN stack. It connects job seekers with employers, allowing users to explore job opportunities, apply for jobs, and manage job postings through dedicated dashboards.

## 🚀 Features

- User authentication and authorization
- Job seeker and employer accounts
- Browse and search available jobs
- Filter jobs by categories
- Post and manage job listings
- Apply for available jobs
- Manage job applications
- Dedicated user dashboards
- RESTful API architecture
- MongoDB database integration

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Cloudinary (if configured)

### Frontend

- React.js
- Redux
- React Router
- Tailwind CSS
- Axios
- React Icons

## 📁 Project Structure

```text
JobNova/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

_Note: Adjust the folder structure to match your actual project._

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd JobNova
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional environment variables required by your application.

### 3. Start Backend Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

For deployment, configure the required environment variables in your Vercel project settings.

Never upload your `.env` file or expose database credentials and JWT secrets.

## 🔐 Environment Variables

| Variable     | Description                       |
| ------------ | --------------------------------- |
| `PORT`       | Backend server port               |
| `MONGO_URI`  | MongoDB connection string         |
| `JWT_SECRET` | Secret key for JWT authentication |

Use the exact environment variable names referenced in your backend code.

## 👨‍💻 Author

**Abdul Wahab**

- GitHub: [wahabsamii](https://github.com/wahabsamii)

---

⭐ If you find this project useful, consider giving it a star!
