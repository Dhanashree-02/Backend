const Modal = require('../models/modal.model.js');

// Create a new Modal
const createModal = async (req, res) => {
  try {
    const { _id, course_id, video } = req.body;

    // Validate required fields
    if (!_id || !course_id || !video) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    // Create a new Modal instance
    const newModal = new Modal({
      _id,
      course_id,
      video,
    });

    // Save the Modal to the database
    const savedModal = await newModal.save();
    res.status(201).json({
      message: "Modal created successfully.",
      modal: savedModal,
    });
  } catch (error) {
    console.error("Error creating Modal:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all Modals or a single Modal by ID
const getModals = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const modal = await Modal.findById(id);
      if (!modal) {
        return res.status(404).json({ error: "Modal not found." });
      }
      return res.status(200).json(modal);
    }

    const modals = await Modal.find();
    res.status(200).json(modals);
  } catch (error) {
    console.error("Error fetching Modals:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update a Modal by ID
const updateModal = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id, video } = req.body;

    // Find and update the Modal
    const updatedModal = await Modal.findByIdAndUpdate(
      id,
      { course_id, video },
      { new: true }
    );

    if (!updatedModal) {
      return res.status(404).json({ error: "Modal not found." });
    }

    res.status(200).json({
      message: "Modal updated successfully.",
      modal: updatedModal,
    });
  } catch (error) {
    console.error("Error updating Modal:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a Modal by ID
const deleteModal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Modal
    const deletedModal = await Modal.findByIdAndDelete(id);

    if (!deletedModal) {
      return res.status(404).json({ error: "Modal not found." });
    }

    res.status(200).json({
      message: "Modal deleted successfully.",
      modal: deletedModal,
    });
  } catch (error) {
    console.error("Error deleting Modal:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createModal,
  getModals,
  updateModal,
  deleteModal,
};
