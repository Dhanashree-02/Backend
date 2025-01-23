const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Instructor', 
  },
  course_description: {
    type: String,
    required: true,
  },
  course_duration: {
    type: String,
    required: true,
  },
  syllabus: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  modal: {
    type: String,
  },
  exam: {
    type: String,
  },
  
},
{
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
