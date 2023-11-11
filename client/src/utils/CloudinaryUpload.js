
import cloudinary from 'cloudinary'

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'mayurs-media',
    api_key: '244236722776258',
    api_secret: 'aOwJaj5lgdy-KHKHTIVhz0EoGDY',
});

// Function to upload multiple images to Cloudinary
const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
        try {
            const result = await uploadImageToCloudinary(file);
            uploadedUrls.push(result);
        } catch (error) {
            console.error('Error uploading an image to Cloudinary', error);
        }
    }

    return uploadedUrls;
};

// Function to upload a single image to Cloudinary
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
};

module.exports = { uploadImageToCloudinary, uploadImagesToCloudinary };