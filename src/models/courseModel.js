const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
    },
    instructor_id: {
        type: String,
        required: true,
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
    image: {
        type: String,
        required: true,
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('Course', courseSchema);
