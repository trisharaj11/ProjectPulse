const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  project:    { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  authorName: { type: String, required: true },
  role:       { type: String, enum: ['student', 'teacher', 'ai'], default: 'student' },
  text:       { type: String, required: true },
  estimatedDays: { type: String, default: '1-2 days' },
  votes:      { type: Number, default: 0 },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
