import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TeacherLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { user, login: authLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(user.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ ...formData, role: 'teacher' });
      // The backend returns user info directly in res.data
      authLogin(res.data, res.data.token);
      toast.success('Welcome, Professor!');
      navigate('/teacher-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="auth-card">
        <div className="auth-header teacher">
          <h2 className="heading-lg mb-0">Teacher Login</h2>
        </div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group-custom">
              <label>Institutional Email</label>
              <input 
                type="email" 
                className="input-custom" 
                placeholder="prof.name@university.edu"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group-custom">
              <label>Password</label>
              <input 
                type="password" 
                className="input-custom" 
                placeholder="••••••••"
                required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-custom btn-primary-teacher w-100 py-3 mt-3">
              Login as Teacher
            </button>
          </form>
          <div className="auth-footer">
            Don't have a teacher account? <Link to="/teacher-signup">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
