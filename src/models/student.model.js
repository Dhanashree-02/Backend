const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    access_lec: {
        type: String,
    },
    access_exam: {
        type: String,
    },
    access_course_intro: {
        type: String,
    },
    role: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);