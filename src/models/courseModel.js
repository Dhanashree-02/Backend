const mongoose = require ('mongoose')

const courseSchema = new mongoose.Schema (

    {

        course : {
            type : String,
            require:true
        },
        fees : {
            type: Number,
            require: true 
        },
        description: {
            type : String,
            require:true
        },
        instructor : {
            type : String,
            require:true
        }, 
        syllabus : {
            type : String,
            require:true
        },
        image : {
            type : String,
            require:true
        }

    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model ('Course', courseSchema)