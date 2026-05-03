import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(user.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) return null;
  return (
    <div className="landing-container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="brand-header text-center mb-5">
        <div className="brand-dot animate-pulse mx-auto mb-3" style={{ width: '16px', height: '16px' }}></div>
        <h1 className="display-lg mb-2">ProjectPulse</h1>
        <p className="body-lg text-muted">Project Enhancement & Feedback Platform</p>
      </div>

      <div className="row g-4 w-100 px-3" style={{ maxWidth: '900px' }}>
        {/* Student Card */}
        <div className="col-md-6">
          <div className="card-base h-100 text-center p-5 role-card">
            <div className="role-icon student mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5"></path>
              </svg>
            </div>
            <h2 className="heading-lg mb-3">Student</h2>
            <p className="body-sm text-muted mb-5">Upload your projects, receive AI-driven suggestions, and get feedback from peers and teachers.</p>
            <div className="d-grid gap-3">
              <Link to="/student-login" className="btn-custom btn-primary-student py-3">Student Login</Link>
              <Link to="/student-signup" className="btn-custom py-2 opacity-75">Create student account</Link>
            </div>
          </div>
        </div>

        {/* Teacher Card */}
        <div className="col-md-6">
          <div className="card-base h-100 text-center p-5 role-card">
            <div className="role-icon teacher mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8M12 14v8M2 12h8M14 12h8"></path>
              </svg>
            </div>
            <h2 className="heading-lg mb-3">Teacher</h2>
            <p className="body-sm text-muted mb-5">Review student submissions, provide expert guidance, and track project progress across your class.</p>
            <div className="d-grid gap-3">
              <Link to="/teacher-login" className="btn-custom btn-primary-teacher py-3">Teacher Login</Link>
              <Link to="/teacher-signup" className="btn-custom py-2 opacity-75">Create teacher account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
