const mongoose = require('mongoose');
const validator = require('validator');

const vendorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a first-name'],
        maxLength: [10, 'Name should be under 40 characters'],
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a last-name'],
        maxLength: [10, 'Name should be under 40 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please enter email in the correct format'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    mobilenumber: {
        type: Number,
        required: [true, "Please provide a number"],
    },
    address: {
        type: String,
        required: [true, 'Please provide registerd addredd'],
    },
    accountType: {
        type: String,
        required: [true, 'Please specify an account type'],
        enum: {
            values: ['business', 'individual'],
            message: 'Account type must be either "business" or "individual"',
        },
    },
    companyname: {
        type: String,
        required: [true, 'Please provide company name']
    },
    companyDisplayName: {
        type: String,
        required: [true, 'Please Provide Company display name']
    },
    logo: {
        type: String,
        required: [true, 'Please provide company logo']
    },
    crNo: {
        type: String,
        required: [true, 'Please provide crNo']
    },
    crImage: {
        type: String,
        // required: [true, 'Please provide CR Image']
    },
    website: {
        type: String,
    },
    socialmedia: [
        String
    ],
});

module.exports = mongoose.model('Vendors', vendorSchema);
