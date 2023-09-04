const mongoose = require('mongoose');

const connectdb = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection successful.. ✌');
    })
    .catch((error) => {
      console.log('DB connection failed');
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectdb;
