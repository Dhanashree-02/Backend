const express = require("express");
const { createStudent ,getStudents, updateStudent, deleteStudent} = require("../controllers/studentController");

const router = express.Router();

// Routes
router.post("/students", createStudent);
router.get ('/students/',getStudents)
router.put("/student/:id" , updateStudent)
router.delete("/student/:id" , deleteStudent)

module.exports = router;