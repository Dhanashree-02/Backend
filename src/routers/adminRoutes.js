const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminController.js');

// Create a new admin
router.post('/admins', createAdmin);

// Get all admins or a single admin by ID
router.get('/admins', getAdmins);

// Update an admin by ID
router.put('/admins/:id', updateAdmin);

// Delete an admin by ID
router.delete('/admins/:id', deleteAdmin);

module.exports = router;