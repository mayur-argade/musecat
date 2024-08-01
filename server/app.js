const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer');

// Morgan middleware
app.use(morgan('tiny'));

// Regular middlewares
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// cookie parser
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalname = file.originalname;
        const extension = originalname.split('.').pop(); // Get the file extension

        const fileName = uniqueSuffix + '.' + extension;
        cb(null, fileName);

        // After saving the file, you can construct the file URL
        const fileURL = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
        req.fileURL = fileURL;
    },
});


// Create the multer instance with the defined storage
const upload = multer({ storage: storage });

// app.use(cors({
//     origin: ['https://182b8bfb-d8a1-45a2-ad30-35a794209f57-00-knxc0ql0ytnh.sisko.replit.dev:3000','*', 'https://www.omanwhereto.com', 'https://omanwhereto.com', "http://localhost:3000"],
//     credentials: true
// }));

app.use(cors({
  origin: true,
  credentials: true, // Enable if you need to send cookies or HTTP authentication
}));

// import all routes here
const auth = require('./routes/AuthRoutes')
const user = require('./routes/UserRoute')
const events = require('./routes/EventRoutes')
const categories = require('./routes/CategoryRoute')
const venue = require('./routes/VenueRoute')
const ticket = require('./routes/TicketRoute')
const notification = require('./routes/NotificationRoutes')
const popup = require('./routes/PopupRoutes')

// Router middleware
app.use('/api/v1/auth', auth);
app.use('/api/v1/', user);
app.use('/api/v1/', events);
app.use('/api/v1/category', categories)
app.use('/api/v1/venue', venue)
app.use('/api/v1/', ticket)
app.use('/api/v1/', notification)
app.use('/api/v1/', popup)

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/v1/upload', upload.single('file'), (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.fileURL
    })
    // res.send('File uploaded!');
});

module.exports = app;
