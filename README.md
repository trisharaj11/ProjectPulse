# ProjectPulse - MERN Project Feedback Platform

ProjectPulse is a premium, glassmorphic project management and feedback platform designed for students and teachers. It streamlines the project submission process, provides AI-driven suggestions, and enables real-time teacher feedback.

## 🌐 Live Application
- **Frontend (UI)**: [https://project-pulse-lime.vercel.app/](https://project-pulse-lime.vercel.app/)
- **Backend (API)**: [https://projectpulse-akyw.onrender.com](https://projectpulse-akyw.onrender.com)

---

## ✨ Key Features & Technology Usage

### ☁️ Cloudinary (Permanent Storage)
Used for hosting all project-related media and raw files. This ensures that every submission has a permanent, secure "address" in the cloud.
- **Project ZIPs**: Source code is stored as raw resources.
- **PDF Reports**: Documentation is stored securely and accessible via direct links.
- **Screenshots**: Project galleries are hosted in high-quality across the platform.

### 🧠 AI Analyzer
A built-in analysis engine that scans project goals and titles to provide:
- **Instant Suggestions**: Automated technical recommendations (e.g., "Implement JWT", "Optimize Database").
- **Time Estimation**: Provides a "⏳ Time to complete" badge for every task to help students manage their workload.

### 📊 Dynamic Dashboards
- **Student View**: Track project versions, view feedback, and upload new iterations.
- **Teacher View**: Overview of all student progress, project review graphs, and direct feedback submission.

### 🌓 Theme System
A robust CSS variable-based system supporting **Dark Mode** and **High-Contrast Light Mode** for maximum accessibility and visual excellence.

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite), CSS3 (Custom Variables), Chart.js
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB Atlas (NoSQL)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🛠️ Installation & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/trisharaj11/ProjectPulse.git
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

---

## 🏃 Running the App Locally

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

---

## 🔒 Security
- **RBAC**: Role-Based Access Control ensuring teachers and students only see relevant data.
- **JWT**: Secure JSON Web Token authentication for all API endpoints.
- **CORS**: Configured to allow secure cross-origin requests from the Vercel frontend.


