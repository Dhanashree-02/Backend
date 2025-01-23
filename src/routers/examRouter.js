const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
  updateExam,
  deleteExam,
} = require('../controllers/exmaController.js');

router.post('/exams', createExam);

router.get('/exams', getExams);

router.put('/exams/:id', updateExam);

router.delete('/exams/:id', deleteExam);

module.exports = router;