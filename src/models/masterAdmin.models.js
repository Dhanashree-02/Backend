const mongoose = require ('mongoose')

const masterAdminSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
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
        required: true,
    },
    student_id: {
        type: String,
    },
    add_admin: {
        type: String,
    },
    exam_id: {
        type: String,
    },
    del_access: {
        type: String,
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('MasterAdmin', masterAdminSchema);