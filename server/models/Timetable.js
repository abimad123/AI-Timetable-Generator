const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  scheduleData: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', TimetableSchema);