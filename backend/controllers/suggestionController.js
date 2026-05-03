const asyncHandler = require('express-async-handler');
const Suggestion = require('../models/Suggestion');
const Project = require('../models/Project');

// @desc    Add a suggestion
// @route   POST /api/projects/:id/suggestions
// @access  Private
const addSuggestion = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const { text } = req.body;

  if (!text) {
    res.status(400); throw new Error('Please add a suggestion text');
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404); throw new Error('Project not found');
  }

  const suggestion = await Suggestion.create({
    project: projectId,
    authorName: req.user.name,
    role: req.user.role,
    text,
    votes: 0
  });

  res.status(201).json(suggestion);
});

// @desc    Vote for a suggestion
// @route   PATCH /api/projects/:id/suggestions/:suggestionId/vote
// @access  Private
const voteSuggestion = asyncHandler(async (req, res) => {
  const suggestion = await Suggestion.findById(req.params.suggestionId);

  if (!suggestion) {
    res.status(404); throw new Error('Suggestion not found');
  }

  suggestion.votes = (suggestion.votes || 0) + 1;
  await suggestion.save();

  res.status(200).json(suggestion);
});

// @desc    Get suggestions for project
// @route   GET /api/projects/:id/suggestions
// @access  Private
const getSuggestions = asyncHandler(async (req, res) => {
  const suggestions = await Suggestion.find({ project: req.params.id }).sort({ createdAt: -1 });
  res.status(200).json(suggestions);
});

module.exports = {
  addSuggestion,
  voteSuggestion,
  getSuggestions
};
