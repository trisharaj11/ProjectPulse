import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const StudentLogin = lazy(() => import('./pages/StudentLogin'));
const StudentSignup = lazy(() => import('./pages/StudentSignup'));
const TeacherLogin = lazy(() => import('./pages/TeacherLogin'));
const TeacherSignup = lazy(() => import('./pages/TeacherSignup'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const StudentUpload = lazy(() => import('./pages/StudentUpload'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Suspense fallback={
            <div className="d-flex align-items-center justify-content-center min-vh-100">
              <Spinner />
            </div>
          }>
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
          </Suspense>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
