# ProjectPulse — MERN Project Feedback Platform

ProjectPulse is a premium, glassmorphic project management and feedback platform designed for students and teachers. It streamlines the project submission process, provides AI-driven suggestions, and enables real-time teacher feedback.

## ✨ Features

- **Dual Dashboard System**: Tailored experiences for Students and Teachers.
- **Permanent Cloud Storage**: Integrated with **Cloudinary** for secure, permanent storage of ZIP files, PDF reports, and project screenshots.
- **AI Analyzer**: Automatically generates project improvement suggestions based on project goals.
- **Version Tracking**: Manage multiple iterations of a project with version history.
- **Glassmorphic UI**: A modern, high-performance interface with dark/light mode support.

## 🚀 Tech Stack

- **Frontend**: React.js (Vite), CSS3 (Custom Variables), Chart.js
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary (Media & Raw Files)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd projectpulse
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🏃 Running the App

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## 🔒 Security
- Protected routes using JWT and Role-based Access Control (RBAC).
- Secure password hashing with bcryptjs.
- Environment variables for sensitive credentials.

---
Built with ❤️ for Project Enhancement.
