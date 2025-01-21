const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs = require("fs");
const Course = require("../models/courseModel.js");

// Create Course
const createCourse = async (req, res) => {
    try {
        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
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

// Read Courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
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
        if (req.file) {
            const localFilePath = req.file.path;
            const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

            fs.unlinkSync(localFilePath); // Delete the local file

            if (!cloudinaryResponse) {
                return res.status(500).json({ message: "Failed to upload updated image to Cloudinary" });
            }

            updatedData = { ...updatedData, image: cloudinaryResponse.url };
        }

        // Update the course
        const course = await Course.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
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

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
