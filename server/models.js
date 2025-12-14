const mongoose = require('mongoose');

// 1. Teacher Schema
const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subjectIds: [{ type: String }], // List of subjects they can teach
  workingHours: { type: String, default: "9am-5pm" }
});

// 2. Room Schema
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Room 101"
  capacity: { type: Number, required: true },
  type: { type: String, default: "classroom" } // "lab" or "classroom"
});

// 3. Subject Schema
const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mathematics"
  code: { type: String, required: true }, // e.g., "MATH101"
  weeklyHours: { type: Number, required: true }
});

// 4. Timetable Schema (The Final Schedule)
const TimetableSchema = new mongoose.Schema({
  name: { type: String, default: "Generated Schedule" },
  createdAt: { type: Date, default: Date.now },
  scheduleData: { type: Object, required: true } // Stores the full JSON result from the AI
});

// Export all models
module.exports = {
  Teacher: mongoose.model('Teacher', TeacherSchema),
  Room: mongoose.model('Room', RoomSchema),
  Subject: mongoose.model('Subject', SubjectSchema),
  Timetable: mongoose.model('Timetable', TimetableSchema)
};