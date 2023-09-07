const mongoose = require('mongoose')

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
    },
    photo: {
        type: String,
    },
    categoryURL: {
        type: String,
        required: [true, "Please provide categoryURL"],
    },

},
    {
        timestamp: true,
    }
)

module.exports = mongoose.model('Categories', categoryModel)