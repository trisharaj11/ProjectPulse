import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      <div className="container-fluid px-lg-5 d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-4">
          <Link className="navbar-brand-custom d-flex align-items-center gap-2" to="/">
            <div className="brand-dot animate-pulse"></div>
            <span className="Syne fw-800">ProjectPulse</span>
          </Link>

          {user && (
            <div className="d-none d-md-flex align-items-center gap-2 ms-4">
              {user.role === 'student' ? (
                <>
                  <Link to="/student-upload" className={`nav-link-custom ${isActive('/student-upload') ? 'active' : ''}`}>Upload</Link>
                  <Link to="/student-dashboard" className={`nav-link-custom ${isActive('/student-dashboard') ? 'active' : ''}`}>My Projects</Link>
                </>
              ) : (
                <Link to="/teacher-dashboard" className={`nav-link-custom ${isActive('/teacher-dashboard') ? 'active' : ''}`}>All Projects</Link>
              )}
            </div>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="theme-toggle-btn" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--ai-color)' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--warning)' }}>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          {user ? (
            <>
              <div className={`user-badge ${user.role}`}>
                <span className="role-prefix">{user.role === 'student' ? 'S' : 'T'}</span>
                <span className="user-name d-none d-sm-inline">{user.name}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/student-login" className="btn-nav-auth student">Student Login</Link>
              <Link to="/teacher-login" className="btn-nav-auth teacher">Teacher Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
