const mongoose = require ('mongoose')

const modalSchema = new mongoose.Schema (
    {
        _id: {
            type: String,
            required: true,
        },
        course_id: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model ( 'Modal', modalSchema)