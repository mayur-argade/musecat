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
    offers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offers" }],
        default: []
    },
    subCategories: [{
        name: String,
        categoryURL: String,
    }],
    events: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
        default: []
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Categories', categoryModel)