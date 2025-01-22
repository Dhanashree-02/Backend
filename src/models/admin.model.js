const mongoose = require ('mongoose')

const adminSchema = new mongoose.Schema (
{
    _id : {
        type : String,
        required: true, 
    },
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    course_id: {
        type: String,
        required: true,
    },
    add_lec: {
        type: String,
    },
    instructor_id: {
        type: String,
    },
    student_id: {
        type: String,
    },
    exam_id: {
        type: String,
    },
    del_access: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model ('Admin', adminSchema)