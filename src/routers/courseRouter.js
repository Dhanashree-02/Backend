const express = require("express");
const { createCourse, getCourses, updateCourse, deleteCourse } = require("../controllers/courseController");
const { uploadMedia } = require('../middlewares/multer.middlerware');

const router = express.Router();

// Routes
router.post("/courses", uploadMedia, createCourse); // Use uploadMedia directly
router.get("/courses", getCourses);
router.put("/courses/:id", uploadMedia, updateCourse); // Use uploadMedia directly
router.delete("/courses/:id", deleteCourse);

module.exports = router;
