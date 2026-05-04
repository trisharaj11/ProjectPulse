import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { user, login: authLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(user.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ ...formData, role: 'student' });
      // The backend returns user info directly in res.data
      authLogin(res.data, res.data.token);
      toast.success('Welcome back, Student!');
      navigate('/student-dashboard');
    } catch (error) {
      console.error("Student login error:", error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="auth-card">
        <div className="auth-header student">
          <h2 className="heading-lg mb-0">Student Login</h2>
        </div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group-custom">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                className="input-custom" 
                placeholder="name@university.edu"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group-custom">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                className="input-custom" 
                placeholder="••••••••"
                value={formData.password}
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-custom btn-primary-student w-100 py-3 mt-3">
              Login to Dashboard
            </button>
          </form>
          <div className="auth-footer">
            Don't have an account? <Link to="/student-signup">Create one here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
