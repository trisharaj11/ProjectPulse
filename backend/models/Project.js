const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  projectName: { type: String, required: true },
  goal:        { type: String },

  // Submission types — all optional but at least one required
  zipPath:     { type: String, default: null },
  liveLink:    { type: String, default: null },
  screenshots: [{ type: String }],   // array of file paths
  reportPath:  { type: String, default: null },

  version:  { type: Number, default: 1 },
  versions: [{
    versionNumber: { type: Number },
    zipPath:       { type: String, default: null },
    liveLink:      { type: String, default: null },
    screenshots:   [{ type: String }],
    reportPath:    { type: String, default: null },
    uploadedAt:    { type: Date, default: Date.now },
    note:          { type: String }  // optional version note
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
