const app = require('./app');
const connectdb = require('./config/connectdb');
require('dotenv').config();
const cloudinary = require('cloudinary')

// Connection with the database
connectdb();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY__API_SECRET,
})




// Creating a basic server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running at port: ${process.env.PORT || 3000} 🚀`);
});
