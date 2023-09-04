const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Morgan middleware
app.use(morgan('tiny'));

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the render engine
app.set('view engine', 'ejs');

const vendorauth = require('./routes/VendorRoutes/VendorAuthRoute')


// Router middleware
app.use('/api/v1/vendor/auth', vendorauth);


module.exports = app;
