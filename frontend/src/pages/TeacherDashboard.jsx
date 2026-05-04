import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/projectAPI';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import '../styles/dashboard.css';
import ChartBar from '../components/ChartBar';
import ChartDoughnut from '../components/ChartDoughnut';

const TeacherDashboard = () => {
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
    p.student?.name.toLowerCase().includes(search.toLowerCase()) ||
    p.student?.regNumber.toLowerCase().includes(search.toLowerCase())
  );

  const completeSubmissions = projects.filter(p => p.hasZip && p.hasLink && p.hasScreenshots && p.hasReport).length;
  const uniqueStudents = [...new Set(projects.map(p => p.student?._id))].length;
  const totalFeedback = projects.reduce((acc, p) => acc + (p.suggestionCount || 0), 0);

  const barData = {
    labels: projects.slice(0, 10).map(p => p.projectName.substring(0, 10) + '...'),
    datasets: [{
      label: 'Suggestions',
      data: projects.slice(0, 10).map(p => p.suggestionCount),
      backgroundColor: '#38bdf8',
      borderRadius: 6
    }]
  };

  const yearCounts = projects.reduce((acc, p) => {
    const year = p.student?.year || 'Unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(yearCounts),
    datasets: [{
      data: Object.values(yearCounts),
      backgroundColor: ['#6c63ff', '#38bdf8', '#43e97b', '#f6c90e'],
      borderWidth: 0
    }]
  };

  return (
    <div className="container-fluid px-lg-5 py-4">
      <header className="page-header d-flex justify-content-between align-items-end mb-5">
        <div>
          <span className="label-lg" style={{ color: 'var(--teacher-primary)' }}>Teacher Dashboard</span>
          <h1 className="display-sm mb-1">All Student Projects</h1>
          <p className="body-md text-muted">Welcome, {user?.name} — review and guide your students</p>
        </div>
        <div className="badge-custom teacher py-2 px-3 h-auto">
          Teacher Access Mode
        </div>
      </header>

      <div className="row g-3 mb-5">
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Total Projects</span>
            <div className="display-md mb-0">{projects.length}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Unique Students</span>
            <div className="display-md mb-0">{uniqueStudents}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Total Feedback</span>
            <div className="display-md mb-0">{totalFeedback}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-base text-center py-4">
            <span className="label-sm text-muted d-block mb-2">Complete Submissions</span>
            <div className="display-md mb-0">{completeSubmissions}</div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-7">
          <div className="card-base h-100">
            <h3 className="heading-md mb-4">Suggestions per Project</h3>
            <ChartBar data={barData} title="" />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card-base h-100">
            <h3 className="heading-md mb-4">Projects by Student Year</h3>
            <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
              <ChartDoughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="search-container" style={{ width: '380px' }}>
          <input 
            type="text" 
            className="input-custom" 
            placeholder="Search by student, project, or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="badge-custom teacher">
          {filteredProjects.length} Submissions ready for review
        </div>
      </div>

      <div className="table-container-custom">
        <table className="w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Project & Goal</th>
              <th>Student</th>
              <th>Branch/Year</th>
              <th>Submissions</th>
              <th>Feedback</th>
              <th>Version</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <div className="body-md text-muted">No student projects yet. Students will appear here once they upload projects.</div>
                </td>
              </tr>
            ) : (
              filteredProjects.map((p, idx) => (
                <tr key={p._id} className="table-row-hover" onClick={() => window.location.href = `/project/${p._id}`}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="body-md fw-600 text-primary">{p.projectName}</div>
                    <div className="caption text-muted text-truncate" style={{ maxWidth: '200px' }}>{p.goal}</div>
                  </td>
                  <td>
                    <div className="body-md fw-600 text-primary">{p.student?.name}</div>
                    <div className="caption text-muted">{p.student?.regNumber}</div>
                  </td>
                  <td>
                    <div className="caption">{p.student?.branch} / {p.student?.year}</div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <span className={`sub-badge-icon ${p.hasZip ? 'active' : 'inactive'}`} title="ZIP">📦</span>
                      <span className={`sub-badge-icon ${p.hasLink ? 'active' : 'inactive'}`} title="Link">🔗</span>
                      <span className={`sub-badge-icon ${p.hasScreenshots ? 'active' : 'inactive'}`} title="Screenshots">🖼</span>
                      <span className={`sub-badge-icon ${p.hasReport ? 'active' : 'inactive'}`} title="Report">📄</span>
                    </div>
                  </td>
                  <td><span className="badge-custom teacher">{p.suggestionCount}</span></td>
                  <td><span className="badge-custom version">v{p.version}</span></td>
                  <td><Link to={`/project/${p._id}`} className="btn-custom btn-primary-teacher btn-xs py-1 px-3">Review →</Link></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
