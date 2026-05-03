import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="metric-card d-flex flex-column align-items-start" style={{ height: '100%' }}>
      <h3 className="mb-2 text-white">{project.projectName}</h3>
      <p className="text-muted small mb-2">By {project.student?.name}</p>
      
      <div className="mb-3">
        <span className={`sub-badge ${project.hasZip ? 'active zip' : 'inactive'}`} title="ZIP File">📦</span>
        <span className={`sub-badge ${project.hasLink ? 'active link' : 'inactive'}`} title="Live Link">🔗</span>
        <span className={`sub-badge ${project.hasScreenshots ? 'active img' : 'inactive'}`} title="Screenshots">🖼</span>
        <span className={`sub-badge ${project.hasReport ? 'active pdf' : 'inactive'}`} title="PDF Report">📄</span>
      </div>

      <div className="d-flex justify-content-between w-100 mt-auto">
        <span className="badge bg-secondary">v{project.version}</span>
        <span className="text-muted small">{project.suggestionCount} Suggestions</span>
      </div>

      <Link to={`/project/${project._id}`} className="btn btn-outline-light w-100 mt-3">View Details</Link>
    </div>
  );
};

export default ProjectCard;
