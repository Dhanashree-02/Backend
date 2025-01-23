const MasterAdmin = require('../models/masterAdmin.models.js');

// Create a new MasterAdmin
const createMasterAdmin = async (req, res) => {
  try {
    const { _id, user_name, email, pass, course_id, add_lec, instructor_id, student_id, add_admin, exam_id, del_access } = req.body;

    // Validate required fields
    if (!_id || !user_name || !email || !pass || !course_id || !instructor_id) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    // Create a new MasterAdmin instance
    const newMasterAdmin = new MasterAdmin({
      _id,
      user_name,
      email,
      pass,
      course_id,
      add_lec,
      instructor_id,
      student_id,
      add_admin,
      exam_id,
      del_access,
    });

    // Save the MasterAdmin to the database
    const savedMasterAdmin = await newMasterAdmin.save();
    res.status(201).json({
      message: "MasterAdmin created successfully.",
      masterAdmin: savedMasterAdmin,
    });
  } catch (error) {
    console.error("Error creating MasterAdmin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all MasterAdmins or a single MasterAdmin by ID
const getMasterAdmins = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const masterAdmin = await MasterAdmin.findById(id);
      if (!masterAdmin) {
        return res.status(404).json({ error: "MasterAdmin not found." });
      }
      return res.status(200).json(masterAdmin);
    }

    const masterAdmins = await MasterAdmin.find();
    res.status(200).json(masterAdmins);
  } catch (error) {
    console.error("Error fetching MasterAdmins:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update a MasterAdmin by ID
const updateMasterAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, email, pass, course_id, add_lec, instructor_id, student_id, add_admin, exam_id, del_access } = req.body;

    // Find and update the MasterAdmin
    const updatedMasterAdmin = await MasterAdmin.findByIdAndUpdate(
      id,
      { user_name, email, pass, course_id, add_lec, instructor_id, student_id, add_admin, exam_id, del_access },
      { new: true }
    );

    if (!updatedMasterAdmin) {
      return res.status(404).json({ error: "MasterAdmin not found." });
    }

    res.status(200).json({
      message: "MasterAdmin updated successfully.",
      masterAdmin: updatedMasterAdmin,
    });
  } catch (error) {
    console.error("Error updating MasterAdmin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a MasterAdmin by ID
const deleteMasterAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the MasterAdmin
    const deletedMasterAdmin = await MasterAdmin.findByIdAndDelete(id);

    if (!deletedMasterAdmin) {
      return res.status(404).json({ error: "MasterAdmin not found." });
    }

    res.status(200).json({
      message: "MasterAdmin deleted successfully.",
      masterAdmin: deletedMasterAdmin,
    });
  } catch (error) {
    console.error("Error deleting MasterAdmin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createMasterAdmin,
  getMasterAdmins,
  updateMasterAdmin,
  deleteMasterAdmin,
};
