const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs = require("fs");
const Course = require("../models/courseModel.js");
const Instructor = require("../models/instructor.model.js"); // Assuming your Instructor model is here

// Create Course
const createCourse = async (req, res) => {
    try {
        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Check if instructor_id is provided
        if (!req.body.instructor_id) {
            return res.status(400).json({ message: "Instructor ID is required" });
        }

        // Verify if instructor exists in the database
        const instructor = await Instructor.findById(req.body.instructor_id);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        // Upload image to Cloudinary
        const localFilePath = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        // Delete the local file after uploading to Cloudinary
        fs.unlinkSync(localFilePath);

        if (!cloudinaryResponse) {
            return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        }

        // Create the course, including the Cloudinary image URL
        const course = new Course({
            ...req.body,
            image: cloudinaryResponse.url, // Add image URL to the course data
        });

        await course.save();

        res.status(201).json({
            message: "Course is created",
            course,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read Courses (populate instructor info)
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('instructor_id', 'user_name email'); // Populate instructor details
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Courses by Instructor ID
const getCoursesByInstructor = async (req, res) => {
    try {
        const instructorId = req.params.instructorId;

        // Find courses based on instructor_id
        const courses = await Course.find({ instructor_id: instructorId }).populate('instructor_id');
        
        if (!courses.length) {
            return res.status(404).json({ message: "No courses found for this instructor" });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Course
const updateCourse = async (req, res) => {
    try {
        // Check if an image file is provided for update
        let updatedData = req.body;

        // Check if instructor_id is provided and validate
        if (updatedData.instructor_id) {
            const instructor = await Instructor.findById(updatedData.instructor_id);
            if (!instructor) {
                return res.status(404).json({ message: "Instructor not found" });
            }
        }

        // If a new image is uploaded, handle Cloudinary upload
        if (req.file) {
            const localFilePath = req.file.path;
            const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

            // Delete the local file after uploading to Cloudinary
            fs.unlinkSync(localFilePath);

            if (!cloudinaryResponse) {
                return res.status(500).json({ message: "Failed to upload updated image to Cloudinary" });
            }

            updatedData = { ...updatedData, image: cloudinaryResponse.url };
        }

        // Update the course in the database
        const course = await Course.findByIdAndUpdate(req.params.id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    getCoursesByInstructor, // Added the new method to get courses by instructor
};
