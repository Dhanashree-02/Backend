const mongoose = require ('mongoose')

const instructorSchema = new mongoose.Schema (
{
    _id : {
        type: String,
        require : true
    },
    user_name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    pass : {
        type: String,
        required: true,
    },
    add_lec : {
        type: String,
    },
    exam : {
        type: String,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model ('Instructor' , instructorSchema)