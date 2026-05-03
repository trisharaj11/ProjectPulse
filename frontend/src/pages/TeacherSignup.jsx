import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: '', teacherId: '', email: '', password: '', department: ''
  });
  const { user, loading } = useContext(AuthContext);
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
      await register({ ...formData, role: 'teacher' });
      toast.success('Teacher account created! Please login.');
      navigate('/teacher-login');
    } catch (error) {
      console.error("Teacher Signup error:", error);
      toast.error(error.response?.data?.message || 'Signup failed. Please check your details.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3 py-5">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header teacher">
          <h2 className="heading-lg mb-0">Teacher Registration</h2>
        </div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Full Name & Title</label>
                  <input 
                    type="text" 
                    name="name"
                    className="input-custom" 
                    placeholder="e.g. Prof. Jane Doe" 
                    value={formData.name}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Teacher ID / Employee ID</label>
                  <input 
                    type="text" 
                    name="teacherId"
                    className="input-custom" 
                    placeholder="e.g. T-12345" 
                    value={formData.teacherId}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-custom">
                  <label>Department</label>
                  <input 
                    type="text" 
                    name="department"
                    className="input-custom" 
                    placeholder="e.g. Faculty of Technology" 
                    value={formData.department}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-custom">
                  <label>Institutional Email</label>
                  <input 
                    type="email" 
                    name="email"
                    className="input-custom" 
                    placeholder="prof.name@university.edu" 
                    value={formData.email}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-12">
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
              </div>
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
