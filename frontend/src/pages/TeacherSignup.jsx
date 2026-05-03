import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', department: ''
  });
  const { user, loading } = useContext(AuthContext);
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
      await register({ ...formData, role: 'teacher' });
      toast.success('Teacher account created! Please login.');
      navigate('/teacher-login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="auth-card">
        <div className="auth-header teacher">
          <h2 className="heading-lg mb-0">Teacher Registration</h2>
        </div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group-custom">
              <label>Full Name & Title</label>
              <input type="text" className="input-custom" placeholder="e.g. Prof. Jane Doe" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group-custom">
              <label>Department</label>
              <input type="text" className="input-custom" placeholder="e.g. Faculty of Technology" required onChange={(e) => setFormData({...formData, department: e.target.value})} />
            </div>
            <div className="form-group-custom">
              <label>Institutional Email</label>
              <input type="email" className="input-custom" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group-custom">
              <label>Password</label>
              <input type="password" className="input-custom" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            <button type="submit" className="btn-custom btn-primary-teacher w-100 py-3 mt-4">
              Register as Teacher
            </button>
          </form>
          <div className="auth-footer">
            Already have a teacher account? <Link to="/teacher-login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;
