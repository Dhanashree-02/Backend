const mongoose = require('mongoose');

const modalSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        course_id: {
            type: mongoose.Schema.Types.ObjectId, // Referencing the Course model
            ref: 'Course',
            required: true,
        },
        videos: {
            type: [String], // Array of strings
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Modal', modalSchema);
