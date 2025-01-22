const Instructor = require('../models/instructor.model.js');

// Create an Instructor
const createInstructor = async (req, res) => {
    try {
        const { _id, user_name, email, pass, add_lec, exam } = req.body;

        // Validate required fields
        if (!_id || !user_name || !email || !pass) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Create new instructor instance
        const newInstructor = new Instructor({
            _id,
            user_name,
            email,
            pass,
            add_lec,
            exam,
        });

        // Save to database
        const savedInstructor = await newInstructor.save();
        res.status(201).json({
            message: "Instructor created successfully.",
            instructor: savedInstructor,
        });
    } catch (error) {
        console.error("Error creating instructor:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Get All Instructors or a Single Instructor by ID
const getInstructors = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const instructor = await Instructor.findById(id);
            if (!instructor) {
                return res.status(404).json({ error: "Instructor not found." });
            }
            return res.status(200).json(instructor);
        }

        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        console.error("Error fetching instructors:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Update an Instructor
const updateInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_name, email, pass, add_lec, exam } = req.body;

        const updatedInstructor = await Instructor.findByIdAndUpdate(
            id,
            { user_name, email, pass, add_lec, exam },
            { new: true } // Return the updated document
        );

        if (!updatedInstructor) {
            return res.status(404).json({ error: "Instructor not found." });
        }

        res.status(200).json({
            message: "Instructor updated successfully.",
            instructor: updatedInstructor,
        });
    } catch (error) {
        console.error("Error updating instructor:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Delete an Instructor
const deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedInstructor = await Instructor.findByIdAndDelete(id);
        if (!deletedInstructor) {
            return res.status(404).json({ error: "Instructor not found." });
        }

        res.status(200).json({
            message: "Instructor deleted successfully.",
            instructor: deletedInstructor,
        });
    } catch (error) {
        console.error("Error deleting instructor:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {createInstructor,getInstructors, updateInstructor,deleteInstructor} 