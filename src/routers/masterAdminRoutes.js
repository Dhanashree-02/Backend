const express = require('express');
const router = express.Router();
const {
  createMasterAdmin,
  getMasterAdmins,
  updateMasterAdmin,
  deleteMasterAdmin,
} = require('../controllers/MasterAdminController.js');

// Create a new MasterAdmin
router.post('/master-admins', createMasterAdmin);

// Get all MasterAdmins or a specific MasterAdmin by ID
router.get('/master-admins/:id?', getMasterAdmins);

// Update MasterAdmin by ID
router.put('/master-admins/:id', updateMasterAdmin);

// Delete MasterAdmin by ID
router.delete('/master-admins/:id', deleteMasterAdmin);

module.exports = router;