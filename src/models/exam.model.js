const mongoose = require ('mongoose')

const studentSchema = new mongoose.Schema(
    {
        _id : {
            type: String,
        required: true,
        },
        user_name : {
            type : String , 
            require : true
        },
        email : {
            type: String,
            required: true,
        },
        pass : {
            type: String,
            required: true,
        },
        lec : {
            type: String,
        },
        exam : {
            type: String,
        },
        role : {
            type: String,
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model ( 'Student ', studentSchema)