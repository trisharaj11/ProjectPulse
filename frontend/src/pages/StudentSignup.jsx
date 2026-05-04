import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', regNumber: '', section: '', branch: '', year: '1st Year'
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
      await register({ ...formData, role: 'student' });
      toast.success('Account created! Please login.');
      navigate('/student-login');
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || 'Signup failed. Please check your details.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 py-5 px-3">
      <div className="auth-card" style={{ maxWidth: '620px' }}>
        <div className="auth-header student">
          <h2 className="heading-lg mb-0">Student Registration</h2>
        </div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    className="input-custom" 
                    placeholder="Enter full name"
                    value={formData.name}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Registration Number</label>
                  <input 
                    type="text" 
                    name="regNumber"
                    className="input-custom" 
                    placeholder="e.g. 20210001"
                    value={formData.regNumber}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-12">
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
              </div>
              <div className="col-md-4">
                <div className="form-group-custom">
                  <label>Branch</label>
                  <input 
                    type="text" 
                    name="branch"
                    className="input-custom" 
                    placeholder="e.g. CSE" 
                    value={formData.branch}
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group-custom">
                  <label>Section</label>
                  <input 
                    type="text" 
                    name="section"
                    className="input-custom" 
                    placeholder="e.g. A" 
                    value={formData.section}
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group-custom">
                  <label>Current Year</label>
                  <select 
                    name="year"
                    className="input-custom" 
                    value={formData.year}
                    onChange={handleChange}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
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
            <button type="submit" className="btn-custom btn-primary-student w-100 py-3 mt-4">
              Create My Account
            </button>
          </form>
          <div className="auth-footer">
            Already have an account? <Link to="/student-login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
