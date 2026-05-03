import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', regNumber: '', branch: '', year: '1st Year'
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
      await register({ ...formData, role: 'student' });
      toast.success('Account created! Please login.');
      navigate('/student-login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
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
                  <input type="text" className="input-custom" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Registration Number</label>
                  <input type="text" className="input-custom" required onChange={(e) => setFormData({...formData, regNumber: e.target.value})} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-custom">
                  <label>Email Address</label>
                  <input type="email" className="input-custom" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Branch</label>
                  <input type="text" className="input-custom" placeholder="e.g. CSE" required onChange={(e) => setFormData({...formData, branch: e.target.value})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Current Year</label>
                  <select className="input-custom" onChange={(e) => setFormData({...formData, year: e.target.value})}>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-custom">
                  <label>Password</label>
                  <input type="password" className="input-custom" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
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
