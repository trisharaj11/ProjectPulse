const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  regNumber:   { type: String, required: true, unique: true },
  section:     { type: String },
  branch:      { type: String },
  year:        { type: String },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  role:        { type: String, default: 'student' },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
