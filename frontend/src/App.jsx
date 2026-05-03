import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import TeacherLogin from './pages/TeacherLogin';
import TeacherSignup from './pages/TeacherSignup';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentUpload from './pages/StudentUpload';
import ProjectDetail from './pages/ProjectDetail';

import './styles/global.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/detail.css';
import './styles/submission.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />
            <Route path="/teacher-signup" element={<TeacherSignup />} />
            
            <Route path="/student-dashboard" element={
              <ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>
            } />
            <Route path="/teacher-dashboard" element={
              <ProtectedRoute allowedRole="teacher"><TeacherDashboard /></ProtectedRoute>
            } />
            <Route path="/student-upload" element={
              <ProtectedRoute allowedRole="student"><StudentUpload /></ProtectedRoute>
            } />
            <Route path="/project/:id" element={
              <ProtectedRoute><ProjectDetail /></ProtectedRoute>
            } />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
