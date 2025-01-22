const mongoose = require ('mongoose')

const studentSchema = new mongoose.Schema(
    {
        _id : {
        type: String,
        required: true,
        },
        course_id : {
            type: String,
            required: true,
        },
        title : {
            type: String,
            required: true,  
        },
        total_marks : {
            type: String,
            required: true,
        },
        pass_marks : {
            type: String,
            required: true,
        },
        duration : {
            type: String,
            required: true,
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model ( 'Student ', studentSchema)