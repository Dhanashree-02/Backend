const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../../public");
        console.log("Uploading to:", uploadPath); // Log the path
        cb(null, uploadPath); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use unique filenames
    },
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg", "image/png", "image/gif", 
        "video/mp4", "video/avi", "video/mkv",
        "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image, video, PDF, and Word files are allowed."), false);
    }
};

// Multer upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // Set file size limit (50 MB for videos, adjust as needed)
    },
});

// Upload to Cloudinary function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided for upload.");
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect whether it's an image or video
        });
        console.log("File successfully uploaded to Cloudinary:", response.url);

        // Delete the file after successful upload
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting local file:", err.message);
        });

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);

        // Delete the file if upload fails
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting local file after failure:", err.message);
        });

        throw error; // Rethrow the error for the calling function to handle
    }
};

// Upload handler for image and video
const uploadMedia = upload.single("image"); // Directly export the middleware for handling single image uploads

module.exports = { uploadMedia, uploadOnCloudinary };