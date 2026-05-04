import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { uploadProject, uploadVersion, getProjectById } from '../api/projectAPI';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/submission.css';

const StudentUpload = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [goal, setGoal] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [zipFile, setZipFile] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [report, setReport] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const res = await getProjectById(projectId);
          setProjectName(res.data.projectName);
          setGoal(res.data.goal);
          setLiveLink(res.data.currentFiles?.liveLink || '');
        } catch (error) {
          toast.error('Failed to load project details');
        }
      };
      fetchProject();
    }
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!zipFile && !liveLink && screenshots.length === 0 && !report) {
      return toast.warning('Please provide at least one submission artifact (ZIP, Link, Screenshots, or Report)');
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('goal', goal);
    formData.append('liveLink', liveLink);
    if (zipFile) formData.append('zip_file', zipFile);
    if (report) formData.append('report_file', report);
    screenshots.forEach(file => formData.append('screenshots', file));

    try {
      if (projectId) {
        await uploadVersion(projectId, formData);
        toast.success('Project updated with new version!');
      } else {
        await uploadProject(formData);
        toast.success('Project uploaded successfully!');
      }
      navigate('/student-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <header className="mb-5">
        <span className="label-lg" style={{ color: 'var(--accent-primary)' }}>
          {projectId ? 'Update Project' : 'New Project Submission'}
        </span>
        <h1 className="display-sm mb-1">{projectId ? 'Upload New Version' : 'Share Your Project'}</h1>
        <p className="body-md text-muted">Provide the latest artifacts for review and feedback.</p>
      </header>

      <div className="card-base p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          <section className="mb-5">
            <h3 className="heading-md mb-4 pb-2 border-bottom">1. Project Info</h3>
            <div className="form-group-custom">
              <label>Project Name</label>
              <input 
                type="text" 
                className="input-custom" 
                required 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. HealthTrack AI"
              />
            </div>
            <div className="form-group-custom mt-4">
              <label>Project Goal / Description</label>
              <textarea 
                className="input-custom" 
                style={{ height: '100px', padding: '12px' }}
                required 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="What is the main purpose of this project?"
              ></textarea>
            </div>
          </section>

          <section className="mb-5">
            <h3 className="heading-md mb-4 pb-2 border-bottom">2. Submission Artifacts</h3>
            <p className="body-sm text-muted mb-4">You must provide at least one of the following:</p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Source Code (ZIP)</label>
                  <input 
                    type="file" 
                    className="input-custom pt-2" 
                    accept=".zip"
                    onChange={(e) => setZipFile(e.target.files[0])}
                  />
                  <div className="caption mt-1">Upload a compressed archive of your code</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Live URL Link</label>
                  <input 
                    type="url" 
                    className="input-custom" 
                    placeholder="https://myproject.com"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                  />
                  <div className="caption mt-1">Direct link to the hosted application</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Screenshots (Multi)</label>
                  <input 
                    type="file" 
                    className="input-custom pt-2" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => setScreenshots(Array.from(e.target.files))}
                  />
                  <div className="caption mt-1">Visual preview of your project</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label>Documentation (PDF)</label>
                  <input 
                    type="file" 
                    className="input-custom pt-2" 
                    accept=".pdf"
                    onChange={(e) => setReport(e.target.files[0])}
                  />
                  <div className="caption mt-1">Project report or presentation</div>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-4 border-top">
            <button type="submit" className="btn-custom btn-primary-student w-100 py-3" disabled={submitting}>
              {submitting ? 'Processing Upload...' : projectId ? 'Upload New Version' : 'Create Project Submission'}
            </button>
            <p className="text-center caption text-muted mt-3">
              By submitting, you agree to share your work for peer and teacher review.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentUpload;
