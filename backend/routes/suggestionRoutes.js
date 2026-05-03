const express = require('express');
const router = express.Router();
const { addSuggestion, voteSuggestion, getSuggestions } = require('../controllers/suggestionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addSuggestion);
router.post('/:id/vote', protect, voteSuggestion);
router.get('/project/:projectId', protect, getSuggestions);

module.exports = router;
