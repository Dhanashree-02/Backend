const express = require('express');
const router = express.Router();
const {
  createModal,
  getModals,
  updateModal,
  deleteModal,
} = require('../controllers/ModalController.js');

// Create a new Modal
router.post('/modals', createModal);

// Get all Modals or a specific Modal by ID
router.get('/modals/:id?', getModals);

// Update Modal by ID
router.put('/modals/:id', updateModal);

// Delete Modal by ID
router.delete('/modals/:id', deleteModal);

module.exports = router;
