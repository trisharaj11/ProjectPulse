import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/projectAPI';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import '../styles/dashboard.css';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return <Spinner />;

  const filteredProjects = projects.filter(p => 
    p.projectName.toLowerCase().includes(search.toLowerCase()) ||
    p.goal.toLowerCase().includes(search.toLowerCase())
  );

  const totalSuggestions = projects.reduce((acc, p) => acc + (p.suggestionCount || 0), 0);
  const totalVersions = projects.reduce((acc, p) => acc + (p.version || 1), 0);

  return (
    <div className="container-fluid px-lg-5 py-4">
      <header className="page-header d-flex justify-content-between align-items-end mb-5">
        <div>
          <span className="label-lg" style={{ color: 'var(--accent-primary)' }}>Student Dashboard</span>
          <h1 className="display-sm mb-1">My Projects</h1>
          <p className="body-md text-muted">Welcome back, {user?.name}</p>
        </div>
        <Link to="/student-upload" className="btn-custom btn-primary-student px-4 py-2 h-auto">
          + New Project
        </Link>
      </header>

      <div className="row g-3 mb-5">
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">My Projects</span>
            <div className="display-md mb-0">{projects.length}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Feedback Received</span>
            <div className="display-md mb-0">{totalSuggestions}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Total Versions</span>
            <div className="display-md mb-0">{totalVersions}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Avg Feedback</span>
            <div className="display-md mb-0">{projects.length ? (totalSuggestions / projects.length).toFixed(1) : 0}</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="search-container" style={{ width: '380px' }}>
          <input 
            type="text" 
            className="input-custom" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="badge-custom student">
          {filteredProjects.length} Projects found
        </div>
      </div>

      <div className="table-container-custom">
        <table className="w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name & Goal</th>
              <th>Submissions</th>
              <th>Suggestions</th>
              <th>Version</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="text-center py-5">
                    <div className="display-sm opacity-25 mb-3">📁</div>
                    <h3 className="heading-lg">No projects yet</h3>
                    <p className="body-md text-muted mb-4">Upload your first project to get AI suggestions and peer feedback</p>
                    <Link to="/student-upload" className="btn-custom btn-primary-student px-4 py-2">Upload Project</Link>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProjects.map((p, idx) => (
                <tr key={p._id} className="table-row-hover" onClick={() => window.location.href = `/project/${p._id}`}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="body-md fw-600 text-primary">{p.projectName}</div>
                    <div className="caption text-muted text-truncate" style={{ maxWidth: '300px' }}>{p.goal}</div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <span className={`sub-badge-icon ${p.hasZip ? 'active' : 'inactive'}`} title="ZIP">📦</span>
                      <span className={`sub-badge-icon ${p.hasLink ? 'active' : 'inactive'}`} title="Link">🔗</span>
                      <span className={`sub-badge-icon ${p.hasScreenshots ? 'active' : 'inactive'}`} title="Screenshots">🖼</span>
                      <span className={`sub-badge-icon ${p.hasReport ? 'active' : 'inactive'}`} title="Report">📄</span>
                    </div>
                  </td>
                  <td><span className="badge-custom student">{p.suggestionCount}</span></td>
                  <td><span className="badge-custom version">v{p.version}</span></td>
                  <td><span className="caption">{new Date(p.updatedAt).toLocaleDateString()}</span></td>
                  <td><Link to={`/project/${p._id}`} className="btn-custom btn-secondary btn-xs py-1 px-3">View</Link></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
