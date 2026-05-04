import React, { useState } from 'react';
import ScreenshotGallery from './ScreenshotGallery';
import PDFViewer from './PDFViewer';

const SubmissionTabs = ({ project }) => {
  const [activeTab, setActiveTab] = useState('zip');

  const apiBase = import.meta.env.VITE_API_URL?.replace('/api/', '') || 'http://localhost:5000';
  const baseURL = apiBase;

  return (
    <div>
      <div className="submission-tabs">
        <button className={`tab-btn ${activeTab === 'zip' ? 'active' : ''}`} onClick={() => setActiveTab('zip')}>📦 ZIP File</button>
        <button className={`tab-btn ${activeTab === 'link' ? 'active' : ''}`} onClick={() => setActiveTab('link')}>🔗 Live Link</button>
        <button className={`tab-btn ${activeTab === 'img' ? 'active' : ''}`} onClick={() => setActiveTab('img')}>🖼 Screenshots</button>
        <button className={`tab-btn ${activeTab === 'pdf' ? 'active' : ''}`} onClick={() => setActiveTab('pdf')}>📄 Report</button>
      </div>

      <div className="tab-content">
        {activeTab === 'zip' && (
          <div>
            {project.zipPath ? (
              <div className="text-center py-4">
                <h4>📦 {project.zipPath}</h4>
                <a href={`${baseURL}/uploads/zips/${project.zipPath}`} download className="btn btn-primary-custom mt-3">Download ZIP</a>
              </div>
            ) : (
              <p className="text-center text-muted">No ZIP file submitted</p>
            )}
          </div>
        )}

        {activeTab === 'link' && (
          <div>
            {project.liveLink ? (
              <div className="text-center py-4">
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="fs-5">{project.liveLink}</a>
                <br/>
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn btn-primary-custom mt-3">Open in new tab</a>
              </div>
            ) : (
              <p className="text-center text-muted">No live link provided</p>
            )}
          </div>
        )}

        {activeTab === 'img' && (
          <div>
            {project.screenshots && project.screenshots.length > 0 ? (
              <ScreenshotGallery screenshots={project.screenshots} />
            ) : (
              <p className="text-center text-muted">No screenshots uploaded</p>
            )}
          </div>
        )}

        {activeTab === 'pdf' && (
          <div>
            {project.reportPath ? (
              <PDFViewer reportUrl={`${baseURL}/api/projects/${project._id}/report`} fileName={project.reportPath} />
            ) : (
              <p className="text-center text-muted">No report uploaded</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionTabs;
