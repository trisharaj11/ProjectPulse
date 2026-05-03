const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Suggestion = require('../models/Suggestion');
const { generateSuggestions } = require('../utils/aiEngine');
const { validateAtLeastOne } = require('../utils/validateSubmission');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Helper to upload ANY file to Cloudinary
const uploadToCloudinary = async (filePath, resourceType = 'auto') => {
  try {
    const options = {
      folder: 'projectpulse_assets',
      resource_type: resourceType
    };
    
    // For ZIP and PDF, we use 'raw' to ensure they don't get processed as images
    if (filePath.endsWith('.zip') || filePath.endsWith('.pdf')) {
      options.resource_type = 'raw';
    }

    const result = await cloudinary.uploader.upload(filePath, options);
    
    // Remove local file after successful upload to save disk space
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
};

// @desc    Upload new project
// @route   POST /api/projects/upload
const uploadProject = asyncHandler(async (req, res) => {
  const { projectName, goal, liveLink } = req.body;
  if (!projectName || !goal) {
    res.status(400); throw new Error('Project name and goal are required');
  }

  const zipFile = req.files && req.files['zip_file'] ? req.files['zip_file'][0] : null;
  const screenshots = req.files && req.files['screenshots'] ? req.files['screenshots'] : [];
  const reportFile = req.files && req.files['report_file'] ? req.files['report_file'][0] : null;

  try {
    validateAtLeastOne({ zipFile, liveLink, screenshots, reportFile });
  } catch (error) {
    res.status(400); throw new Error(error.message);
  }

  // Upload everything to Cloudinary
  let zipUrl = null;
  if (zipFile) zipUrl = await uploadToCloudinary(zipFile.path);

  let reportUrl = null;
  if (reportFile) reportUrl = await uploadToCloudinary(reportFile.path);

  const screenshotUrls = [];
  for (const file of screenshots) {
    const url = await uploadToCloudinary(file.path);
    if (url) screenshotUrls.push(url);
  }

  const project = await Project.create({
    student: req.user.id,
    projectName,
    goal,
    liveLink: liveLink || null,
    zipPath: zipUrl, // Storing full URL
    reportPath: reportUrl,
    screenshots: screenshotUrls,
    version: 1,
    versions: [{
      versionNumber: 1,
      liveLink: liveLink || null,
      zipPath: zipUrl,
      reportPath: reportUrl,
      screenshots: screenshotUrls,
      note: 'Initial submission'
    }]
  });

  // Generate AI Suggestions
  const aiSuggestions = generateSuggestions(goal);
  if (aiSuggestions.length > 0) {
    const suggestionsToInsert = aiSuggestions.map(s => ({
      ...s,
      project: project._id
    }));
    await Suggestion.insertMany(suggestionsToInsert);
  }

  res.status(201).json(project);
});

// @desc    Get projects
const getProjects = asyncHandler(async (req, res) => {
  let projects;
  if (req.user.role === 'student') {
    projects = await Project.find({ student: req.user.id }).populate('student', 'name regNumber branch year');
  } else {
    projects = await Project.find().populate('student', 'name regNumber branch year');
  }
  
  const projectsWithMeta = await Promise.all(projects.map(async (project) => {
    const suggestionCount = await Suggestion.countDocuments({ project: project._id });
    const p = project.toObject();
    p.suggestionCount = suggestionCount;
    p.hasZip = !!p.zipPath;
    p.hasLink = !!p.liveLink;
    p.hasScreenshots = p.screenshots && p.screenshots.length > 0;
    p.hasReport = !!p.reportPath;
    return p;
  }));

  res.status(200).json(projectsWithMeta);
});

// @desc    Get project by ID
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('student', 'name regNumber branch year');
  if (!project) {
    res.status(404); throw new Error('Project not found');
  }

  const suggestions = await Suggestion.find({ project: project._id }).sort({ createdAt: -1 });
  
  const projectObj = project.toObject();
  projectObj.hasZip = !!projectObj.zipPath;
  projectObj.hasLink = !!projectObj.liveLink;
  projectObj.hasScreenshots = projectObj.screenshots && projectObj.screenshots.length > 0;
  projectObj.hasReport = !!projectObj.reportPath;
  
  // Attach URLs for the frontend
  projectObj.currentFiles = {
    zipPath: projectObj.zipPath, // These are now full URLs
    liveLink: projectObj.liveLink,
    screenshots: projectObj.screenshots,
    reportPath: projectObj.reportPath
  };

  res.status(200).json({ ...projectObj, suggestions });
});

// @desc    Upload new version
const uploadNewVersion = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404); throw new Error('Project not found');
  }

  const { liveLink, versionNote } = req.body;
  const zipFile = req.files && req.files['zip_file'] ? req.files['zip_file'][0] : null;
  const screenshots = req.files && req.files['screenshots'] ? req.files['screenshots'] : [];
  const reportFile = req.files && req.files['report_file'] ? req.files['report_file'][0] : null;

  try {
    validateAtLeastOne({ zipFile, liveLink, screenshots, reportFile });
  } catch (error) {
    res.status(400); throw new Error(error.message);
  }

  const newVersionNumber = project.version + 1;
  
  let zipUrl = project.zipPath;
  if (zipFile) zipUrl = await uploadToCloudinary(zipFile.path);

  let reportUrl = project.reportPath;
  if (reportFile) reportUrl = await uploadToCloudinary(reportFile.path);

  let finalScreenshotPaths = project.screenshots;
  if (screenshots.length > 0) {
    const newScreenshotUrls = [];
    for (const file of screenshots) {
      const url = await uploadToCloudinary(file.path);
      if (url) newScreenshotUrls.push(url);
    }
    finalScreenshotPaths = newScreenshotUrls;
  }

  const newLiveLink = liveLink || project.liveLink;

  project.version = newVersionNumber;
  project.zipPath = zipUrl;
  project.reportPath = reportUrl;
  project.screenshots = finalScreenshotPaths;
  project.liveLink = newLiveLink;
  project.updatedAt = Date.now();

  project.versions.push({
    versionNumber: newVersionNumber,
    liveLink: newLiveLink,
    zipPath: zipUrl,
    reportPath: reportUrl,
    screenshots: finalScreenshotPaths,
    note: versionNote || `Version ${newVersionNumber}`
  });

  await project.save();
  res.status(200).json(project);
});

module.exports = {
  uploadProject,
  getProjects,
  getProjectById,
  uploadNewVersion
};
