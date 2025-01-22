const express = require("express");
const { createCourse, getCourses, updateCourse, deleteCourse } = require("../controllers/courseController");
const { upload } = require("../middlewares/multer.middlerware.js"); // Multer middleware

const router = express.Router();

// Routes
router.post("/courses", upload.single("image"), createCourse);
router.get("/courses", getCourses);
router.put("/courses/:id", upload.single("image"), updateCourse);
router.delete("/delete/:id", deleteCourse); 


module.exports = router;