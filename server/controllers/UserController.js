const statusCode = require('../data/statusCode');
const vendorService = require('../services/vendor-service')
const userService = require('../services/user-service')
const cloudinary = require('cloudinary');
const ContactUsModel = require('../models/ContactUsModel');
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service')

exports.updateVendorProfile = async (req, res) => {
    const { firstname, lastname, email, password, mobilenumber, address, accountType, companyname, companyDisplayName, crNo, logo, crImage } = req.body

    try {
        let uploadedLogo = ''
        let uploadedCrImage = ''


        if (logo) {
            uploadedLogo = await cloudinary.v2.uploader.upload(logo, {
                folder: "muscat/vendor",
            })
        }

        if (crImage) {
            uploadedCrImage = await cloudinary.v2.uploader.upload(crImage, {
                folder: "muscat/vendor",
            })
        }

        const data = {
            _id: req.user._id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            mobilenumber: mobilenumber,
            address: address,
            accountType: accountType,
            companyname: companyname,
            companyDisplayName: companyDisplayName,
            crNo: crNo,
            logo: uploadedLogo.secure_url,
            crImage: uploadedCrImage.secure_url
        }

        const vendor = await vendorService.updateVendor(data)
        const updatedVendor = await vendorService.findVendor({ _id: req.user._id })

        return res.status(200).json({
            success: true,
            data: updatedVendor
        })

    } catch (error) {
        console.log(error)
        if (error.codeName == "DuplicateKey")
            res.status(500).json({ success: false, data: "Email already exists" })
    }

}

exports.getVendorProfile = async (req, res) => {
    const { _id } = req.user

    try {
        const vendor = await vendorService.findVendor({ _id: _id })
        if (!vendor) {
            return res.status(404).json({
                success: false,
                data: "vendor not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: vendor
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.getAllNotifications = async (req, res) => {
    const { _id } = req.user
    try {
        const notifications = await notificationService.getAllNotifications({ userId: _id })
        return res.status(200).json({
            success: true,
            data: notifications
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }
}

exports.updateUserProfile = async (req, res) => {

    const { email, username, mobilenumber } = req.body

    try {
        const data = {
            _id: req.user._id,
            email: email,
            username: username,
            mobilenumber: mobilenumber
        }

        const user = await userService.updateUser(data)
        const updatedUser = await userService.findUser({ _id: req.user._id })

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: updatedUser
        })

    } catch (error) {
        console.log(error)
    }


}

exports.getUserProfile = async (req, res) => {
    try {

        const user = await userService.findUser({ _id: req.user._id })
        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: user
        })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: true,
            data: statusCode.INTERNAL_SERVER_ERROR.message
        })
    }
}

exports.writeContactMessage = async (req, res) => {
    const { firstname, lastname, email, message } = req.body

    try {
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            message: message
        }

        const contactMessage = await ContactUsModel.create(data)

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: contactMessage
        })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: statusCode.INTERNAL_SERVER_ERROR.message
        })
    }
}

exports.getFavoriteEvents = async (req, res) => {
    const { _id } = req.user;

    try {
        // Find the user by ID to get their 'favorites' array
        const user = await userService.findUser({ _id });

        if (!user) {
            return res.status(statusCode.NOT_FOUND.code).json({
                success: false,
                data: statusCode.NOT_FOUND.message
            });
        }

        // Extract the event IDs from the user's 'favorites' array
        const favoriteEventIds = user.favorites;

        // Find the event details for the favorite event IDs
        const favoriteEvents = await eventService.findAllEvents({ _id: { $in: favoriteEventIds } });

        res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: favoriteEvents
        });

    } catch (error) {
        console.error(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: statusCode.INTERNAL_SERVER_ERROR.message
        });
    }
};

exports.getEventDetails = async (req, res) => {
    const { eventid } = req.params

    if (!eventid) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: statusCode.BAD_REQUEST.message
        })
    }
    try {
        const today = new Date();
        const event = await eventService.findEvent({ _id: eventid })

        const events = await eventService.findAllEvents({ date: { $gte: today } }, 4)

        const offers = await offerService.findAllOffer({ expiry: { $gte: today } }, 4)

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: {
                eventDetails: event,
                upcomingEvents: events,
                offers: offers
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: statusCode.INTERNAL_SERVER_ERROR.message
        })
    }


}