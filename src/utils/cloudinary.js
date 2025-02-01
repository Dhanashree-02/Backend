const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Upload Function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided for upload.");
        }

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
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
module.exports = { uploadOnCloudinary };