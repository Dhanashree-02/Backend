const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    add_lec: { type: String },
    exam: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Reference to Course model
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Instructor', instructorSchema);
