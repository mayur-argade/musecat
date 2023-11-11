const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer');
require('./middleware/passport')

// Morgan middleware
app.use(morgan('tiny'));

// Regular middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// cookie parser
app.use(cookieParser())

// cors middleware
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,
//     optionSuccessStatus: 200,
// }

const upload = multer({ dest: 'uploads/' });

app.use(cors({
    origin: ['https://www.omanwhereto.com', 'https://omanwhereto.com', "http://localhost:3000"],
    credentials: true
}));

// import all routes here
const auth = require('./routes/AuthRoutes')
const user = require('./routes/UserRoute')
const events = require('./routes/EventRoutes')
const categories = require('./routes/CategoryRoute')
const venue = require('./routes/VenueRoute')
const ticket = require('./routes/TicketRoute')
const notification = require('./routes/NotificationRoutes')

// Router middleware
app.use('/api/v1/auth', auth);
app.use('/api/v1/', user);
app.use('/api/v1/', events);
app.use('/api/v1/category', categories)
app.use('/api/v1/venue', venue)
app.use('/api/v1/', ticket)
app.use('/api/v1/', notification)


module.exports = app;
