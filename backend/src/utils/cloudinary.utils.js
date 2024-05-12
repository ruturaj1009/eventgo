const cloudinary = require('cloudinary').v2
const fs = require("fs");


cloudinary.config({ 
  cloud_name: 'ruturaj1009', 
  api_key: '539742557859783', 
  api_secret: 'hSYs226NY-yXcjOcNiacbXyPMxk',
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

module.exports = {uploadOnCloudinary};