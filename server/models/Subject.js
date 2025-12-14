// server/models/Subject.js
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true, unique: true },
  weeklyHours: { type: Number, required: true },
  studentCount: { type: Number, required: true, default: 30 }
});

module.exports = mongoose.model('Subject', SubjectSchema);