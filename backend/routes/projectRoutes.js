const express = require('express');
const router = express.Router();
const { uploadProject, getProjects, getProjectById, uploadNewVersion } = require('../controllers/projectController');
const { addSuggestion, voteSuggestion } = require('../controllers/suggestionController');
const { protect } = require('../middleware/authMiddleware');
const { studentOnly } = require('../middleware/roleMiddleware');
const { uploadNewVersion: combinedUpload } = require('../middleware/upload');

// Suggestions
router.post('/:id/suggestions', protect, addSuggestion);
router.patch('/:id/suggestions/:suggestionId/vote', protect, voteSuggestion);

// Create project
router.post('/upload', protect, studentOnly, combinedUpload.fields([
  { name: 'zip_file', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 },
  { name: 'report_file', maxCount: 1 }
]), uploadProject);

// Get all projects
router.get('/', protect, getProjects);

// Get project by ID
router.get('/:id', protect, getProjectById);

// Upload new version
router.post('/:id/version', protect, studentOnly, combinedUpload.fields([
  { name: 'zip_file', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 },
  { name: 'report_file', maxCount: 1 }
]), uploadNewVersion);

module.exports = router;
