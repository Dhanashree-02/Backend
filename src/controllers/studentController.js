const Student = require('../models/student.model.js');

const createStudent = async (req,res) => {
    try {
        const {
            _id,
            user_name,
            email,
            pass,
            access_lec,
            access_exam,
            access_course_intro,
    } = req.body;

    if (!_id || !user_name || !email || !pass){
        return res.status(400).json({ error: "All required fields must be provided." });
    }

    // Create a new student instance
    const newStudent = new Student({
        _id,
        user_name,
        email,
        pass,
        access_lec,
        access_exam,
        access_course_intro,
    });
    
// Save the student to the database
const savedStudent = await newStudent.save();

res.status(201).json({
    message: "Student created successfully.",
    student: savedStudent,
});
} catch (error) {
console.error("Error creating student:", error);
res.status(500).json({
    error: "Internal server error.",
});
}
};

// Get Student
const getStudents = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const student = await Student.findById(id);
            if (!student) {
                return res.status(404).json({ error: "Student not found." });
            }
            return res.status(200).json(student);
        }

        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Update
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found." });
        }

        res.status(200).json({
            message: "Student updated successfully.",
            student: updatedStudent,
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// delete 
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found." });
        }

        res.status(200).json({
            message: "Student deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {createStudent, getStudents, updateStudent, deleteStudent }