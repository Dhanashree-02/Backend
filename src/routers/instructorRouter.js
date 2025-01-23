const express = require('express');
const router = express.Router();
const {createInstructor,getInstructors, updateInstructor, deleteInstructor,} = require('../controllers/instructorController.js');

router.post('/instructors', createInstructor); 
router.get('/instructors', getInstructors);
router.put('/instructors/:id', updateInstructor); 
router.delete('/instructors/:id', deleteInstructor); 

module.exports = router;
