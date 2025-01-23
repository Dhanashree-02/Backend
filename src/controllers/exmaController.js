const Exam = require('../models/exam.model.js');

// Create an Exam
const createExam = async (req, res) => {
  try {
    const { _id, course_id, title, total_marks, pass_marks, duration } = req.body;

    // Validate required fields
    if (!_id || !course_id || !title || !total_marks || !pass_marks || !duration) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    // Create a new Exam instance
    const newExam = new Exam({
      _id,
      course_id,
      title,
      total_marks,
      pass_marks,
      duration,
    });

    // Save the exam to the database
    const savedExam = await newExam.save();
    res.status(201).json({
      message: "Exam created successfully.",
      exam: savedExam,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get All Exams or a Single Exam by ID
const getExams = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const exam = await Exam.findById(id);
      if (!exam) {
        return res.status(404).json({ error: "Exam not found." });
      }
      return res.status(200).json(exam);
    }

    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update an Exam
const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id, title, total_marks, pass_marks, duration } = req.body;

    // Find and update the exam
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { course_id, title, total_marks, pass_marks, duration },
      { new: true } // Return the updated document
    );

    if (!updatedExam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.status(200).json({
      message: "Exam updated successfully.",
      exam: updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete an Exam
const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the exam
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.status(200).json({
      message: "Exam deleted successfully.",
      exam: deletedExam,
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { createExam, getExams, updateExam, deleteExam,};
