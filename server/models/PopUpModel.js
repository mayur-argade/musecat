const mongoose = require("mongoose");
const validator = require("validator");
var Schema = mongoose.Schema

const popupModel = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("popups", popupModel, "popups");