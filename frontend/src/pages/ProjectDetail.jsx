import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, uploadVersion, addSuggestion, voteSuggestion } from '../api/projectAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ScreenshotGallery from '../components/ScreenshotGallery';
import SubmissionTabs from '../components/SubmissionTabs';

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('zip');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await getProjectById(id);
      setProject(res.data);
      // Auto-set first available tab
      if (res.data.hasZip) setActiveTab('zip');
      else if (res.data.hasLink) setActiveTab('link');
      else if (res.data.hasScreenshots) setActiveTab('screenshots');
      else if (res.data.hasReport) setActiveTab('report');
    } catch (error) {
      toast.error('Failed to load project');
    }
    setLoading(false);
  };

  const handleAddSuggestion = async (e) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;
    setSubmitting(true);
    try {
      await addSuggestion(id, { 
        text: newSuggestion, 
        authorName: user.name,
        role: user.role 
      });
      toast.success('Suggestion added!');
      setNewSuggestion('');
      fetchProject();
    } catch (error) {
      toast.error('Failed to add suggestion');
    }
    setSubmitting(false);
  };

  if (loading) return <Spinner />;
  if (!project) return <div className="text-center py-5">Project not found</div>;

  const isOwner = user?.role === 'student' && user?._id === project.student?._id;
  const isTeacher = user?.role === 'teacher';

  return (
    <div className="project-detail-container px-lg-5 py-5">
      <Link to={isTeacher ? '/teacher-dashboard' : '/student-dashboard'} className="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        {isTeacher ? 'Back to All Projects' : 'Back to My Projects'}
      </Link>

      <div className="detail-header row align-items-end g-4">
        <div className="col-lg-8">
          <div className="project-title-section">
            <span className="label-md" style={{ color: isTeacher ? 'var(--teacher-primary)' : 'var(--accent-primary)' }}>
              {isTeacher ? `Reviewing: ${project.student?.name}` : 'My Project Submission'}
            </span>
            <h1 className="display-sm">{project.projectName}</h1>
            <p className="body-md text-muted mb-0">{project.goal}</p>
            
            {isTeacher && (
              <div className="student-info-tags">
                <span className="badge-custom teacher">{project.student?.regNumber}</span>
                <span className="badge-custom teacher">{project.student?.branch}</span>
                <span className="badge-custom teacher">{project.student?.year}</span>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4 text-lg-end">
          <div className="d-flex gap-2 justify-content-lg-end">
            <span className="badge-custom version py-2 px-3">Current Version: v{project.version}</span>
            {isOwner && (
              <Link to={`/student-upload?id=${project._id}`} className="btn-custom btn-primary-student py-2 px-3">
                Update Project
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-lg-8">
          {/* Submission Viewer */}
          <section className="mb-5">
            <h3 className="heading-md mb-4">Submission Artifacts</h3>
            <div className="tabs-container">
              <button className={`tab-btn ${activeTab === 'zip' ? 'active' : ''}`} onClick={() => setActiveTab('zip')}>
                <span className="tab-dot"></span> ZIP Source
              </button>
              <button className={`tab-btn ${activeTab === 'link' ? 'active' : ''}`} onClick={() => setActiveTab('link')}>
                <span className="tab-dot"></span> Live Link
              </button>
              <button className={`tab-btn ${activeTab === 'screenshots' ? 'active' : ''}`} onClick={() => setActiveTab('screenshots')}>
                <span className="tab-dot"></span> Screenshots
              </button>
              <button className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`} onClick={() => setActiveTab('report')}>
                <span className="tab-dot"></span> Report PDF
              </button>
            </div>

            <div className="card-base p-4 min-vh-40">
              {activeTab === 'zip' && (
                project.hasZip ? (
                  <div className="text-center py-5">
                    <div className="display-sm mb-3">📦</div>
                    <h4 className="heading-md mb-3">Source Code Bundle</h4>
                    <p className="body-md text-muted mb-4">A ZIP file has been uploaded containing the full project source.</p>
                    <a href={project.currentFiles.zipPath} className="btn-custom btn-secondary px-4 py-2" target="_blank" rel="noreferrer">
                      Download ZIP Archive
                    </a>
                  </div>
                ) : <EmptyTab label="No source code uploaded" />
              )}

              {activeTab === 'link' && (
                project.hasLink ? (
                  <div className="text-center py-5">
                    <div className="display-sm mb-3">🔗</div>
                    <h4 className="heading-md mb-3">Live Deployment</h4>
                    <p className="body-md text-muted mb-4">This project is hosted live at the URL below:</p>
                    <div className="mono body-lg p-3 bg-surface2 rounded mb-4" style={{ color: 'var(--accent-primary)' }}>
                      {project.currentFiles.liveLink}
                    </div>
                    <a href={project.currentFiles.liveLink} target="_blank" rel="noreferrer" className="btn-custom btn-primary-student px-4 py-2">
                      Visit Live Site →
                    </a>
                  </div>
                ) : <EmptyTab label="No live link provided" />
              )}

              {activeTab === 'screenshots' && (
                project.hasScreenshots ? (
                  <ScreenshotGallery images={project.currentFiles.screenshots} />
                ) : <EmptyTab label="No screenshots uploaded" />
              )}

              {activeTab === 'report' && (
                project.hasReport ? (
                  <div className="text-center py-5">
                    <div className="display-sm mb-3">📄</div>
                    <h4 className="heading-md mb-3">Project Documentation</h4>
                    <p className="body-md text-muted mb-4">A detailed report in PDF format is available for this version.</p>
                    <a href={project.currentFiles.reportPath} target="_blank" rel="noreferrer" className="btn-custom btn-secondary px-4 py-2">
                      Open PDF Report
                    </a>
                  </div>
                ) : <EmptyTab label="No documentation report uploaded" />
              )}
            </div>
          </section>

          {/* Feedback Section */}
          <section>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="heading-md mb-0">Project Feedback & Suggestions</h3>
              <span className="badge-custom student">{project.suggestions.length} Suggestions</span>
            </div>

            <div className="add-suggestion-form mb-5">
              <form onSubmit={handleAddSuggestion} className="card-base p-4">
                <label className="label-md mb-3 d-block">Add Your {isTeacher ? 'Teacher Feedback' : 'Suggestion'}</label>
                <textarea 
                  className="input-custom mb-3" 
                  style={{ height: '100px', padding: '12px' }}
                  placeholder={isTeacher ? "Provide expert guidance to this student..." : "What could be improved in this project?"}
                  value={newSuggestion}
                  onChange={(e) => setNewSuggestion(e.target.value)}
                  required
                ></textarea>
                <div className="text-end">
                  <button type="submit" className={`btn-custom ${isTeacher ? 'btn-primary-teacher' : 'btn-primary-student'} px-4 py-2`} disabled={submitting}>
                    {submitting ? 'Posting...' : 'Post Feedback'}
                  </button>
                </div>
              </form>
            </div>

            <div className="suggestions-list">
              {project.suggestions.length === 0 ? (
                <div className="text-center py-5 opacity-50">
                  <p>No feedback yet. Be the first to add a suggestion!</p>
                </div>
              ) : (
                project.suggestions.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(sug => (
                  <div key={sug._id} className={`suggestion-card ${sug.role === 'teacher' ? 'teacher-feedback' : sug.role === 'ai' ? 'ai-feedback' : ''}`}>
                    <div className="suggestion-content">
                      <p className="suggestion-text" style={{ color: 'var(--text-primary)', fontWeight: '600', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: '12px' }}>
                        {sug.text || sug.suggestion || sug.message || "(No feedback text provided)"}
                      </p>
                      <div className="meta-row">
                        <span className={`badge-custom ${sug.role === 'ai' ? 'ai' : sug.role}`}>
                          {sug.role === 'teacher' ? '👨‍🏫 Teacher' : sug.role === 'ai' ? '🤖 AI Analyzer' : '👤 Student'}: {sug.authorName}
                        </span>
                        <span className="badge-custom version" style={{ background: 'var(--bg-surface2)', color: 'var(--text-muted)' }}>
                          ⏳ {sug.estimatedDays || '1-2 days'}
                        </span>
                        <span className="caption text-muted">{new Date(sug.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="col-lg-4">
          <div className="sidebar-sticky" style={{ position: 'sticky', top: '100px' }}>
            <div className="card-base mb-4">
              <h3 className="heading-md mb-4">Version History</h3>
              <div className="version-list">
                {project.versions?.map((v, i) => (
                  <div key={i} className="version-item">
                    <div className="version-info">
                      <span className="v-num">v{v.versionNumber}</span>
                      <span className="v-date">{new Date(v.uploadedAt).toLocaleDateString()}</span>
                    </div>
                    <span className="badge-custom student">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base">
              <h3 className="heading-md mb-4">Quick Stats</h3>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between">
                  <span className="body-sm text-muted">Total Feedback</span>
                  <span className="body-sm fw-600">{project.suggestions.length}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="body-sm text-muted">Artifacts Submitted</span>
                  <span className="body-sm fw-600">
                    {[project.hasZip, project.hasLink, project.hasScreenshots, project.hasReport].filter(Boolean).length}/4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyTab = ({ label }) => (
  <div className="text-center py-5 opacity-25">
    <p>{label}</p>
  </div>
);

export default ProjectDetail;
