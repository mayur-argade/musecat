const app = require('./app');
const connectdb = require('./config/connectdb');

require('dotenv').config();

// Connection with the database
connectdb();

// Creating a basic server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at port: ${process.env.PORT || 3000} 🚀`);
});
