const Admin = require('../models/admin.model.js');

// Create a new Admin
const createAdmin = async (req, res) => {
  try {
    const { _id, user_name, email, pass, course_id, add_lec, instructor_id, student_id, exam_id, del_access } = req.body;

    // Validate required fields
    if (!_id || !user_name || !email || !pass || !course_id) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    // Create a new Admin instance
    const newAdmin = new Admin({
      _id,
      user_name,
      email,
      pass,
      course_id,
      add_lec,
      instructor_id,
      student_id,
      exam_id,
      del_access,
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();
    res.status(201).json({
      message: "Admin created successfully.",
      admin: savedAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all Admins or a single Admin by ID
const getAdmins = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found." });
      }
      return res.status(200).json(admin);
    }

    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update an Admin by ID
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, email, pass, course_id, add_lec, instructor_id, student_id, exam_id, del_access } = req.body;

    // Find and update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { user_name, email, pass, course_id, add_lec, instructor_id, student_id, exam_id, del_access },
      { new: true } // Return the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    res.status(200).json({
      message: "Admin updated successfully.",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete an Admin by ID
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the admin
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    res.status(200).json({
      message: "Admin deleted successfully.",
      admin: deletedAdmin,
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
};
