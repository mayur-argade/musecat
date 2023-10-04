const statusCode = require('../data/statusCode');
const vendorService = require('../services/vendor-service')
const userService = require('../services/user-service')
const cloudinary = require('cloudinary');
const ContactUsModel = require('../models/ContactUsModel');
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service');
const ticketService = require('../services/ticket-service');
const moment = require('moment')

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

exports.getVendorDetails = async (req, res) => {
    const vendorid = req.params.vendorid
    console.log(vendorid)
    try {

        const vendor = await vendorService.findVendor({ _id: vendorid })
        return res.status(200).json({
            success: true,
            data: vendor
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

exports.getAllNotifications = async (req, res) => {
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

    const { email, firstname, lastname, username, mobilenumber } = req.body

    try {
        const data = {
            _id: req.user._id,
            email: email,
            username: username,
            firstname: firstname,
            lastname: lastname,
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
        console.log(req.user)
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
        const user = await userService.findUser({ _id: _id });

        if (!user) {
            return res.status(statusCode.NOT_FOUND.code).json({
                success: false,
                data: statusCode.NOT_FOUND.message
            });
        }

        console.log(user)

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

exports.getPastPurchase = async (req, res) => {
    try {
        const user = await userService.findUser({ _id: req.user.id });
        let pastpurchased = user.BookedTickets;
        const BookedTickets = await ticketService.findAllTickets({ _id: { $in: pastpurchased } });

        // Iterate through BookedTickets and log specific properties
        console.log("Logging BookedTickets:");
        BookedTickets.forEach((ticket) => {
            console.log("Ticket ID:", ticket._id);
            console.log("Event ID:", ticket.eventid);
            // Add more properties as needed
        });

        const response = [];

        for (const ticket of BookedTickets) {
            let event = await eventService.findEvent({ _id: ticket.eventid });
            event.ticketid = ticket._id

            console.log("ticket id in event", event.ticketid)

            const eventobject = {
                eventid: event._id,
                title: event.title,
                description: event.description,
                displayPhoto: event.displayPhoto,
                location: event.location,
                ticketid: ticket._id
            }
            // console.log(event)
            response.push(eventobject);
        }

        return res.status(200).json({
            success: true,
            data: {
                pastpurchased: response, // Use the response array, not 'res'
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while processing the request.",
        });
    }
};

exports.verifyVendor = async (req, res) => {

    const { vendorid } = req.body

    try {
        const vendor = await vendorService.findVendor({ _id: vendorid })
        if (vendor) {
            const data = {
                _id: vendorid,
                isVerified: true
            }

            const updatedVendor = vendorService.updateVendor(data)

            return res.status(200).json({
                success: true,
                data: updatedVendor
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }

}

exports.getAllUnverifiedVendors = async (req, res) => {

    const vendors = await vendorService.findVendors({ isVerified: false })

    return res.status(200).json({
        success: true,
        data: vendors
    })

}

exports.getAllUsers = async (req, res) => {

    const users = await userService.findUsers()

    return res.status(200).json({
        success: true,
        data: users
    })
}

exports.getAllUsersList = async (req, res) => {
    const users = await userService.findAllUsers()
    return res.status(200).json({
        success: true,
        data: users
    })
}

exports.deleteUser = async (req, res) => {
    const { userid } = req.body
    
    console.log(req.body)

    try {
        const user = await userService.deleteUser({ _id: userid })

        if (user) {
            return res.status(200).json({
                success: true,
                data: "User Deleted Successfully"
            })
        }
        else {
            return res.status(500).json({
                success: false,
                data: "something went wrong"
            })

        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error
        })

    }
}

exports.getAllVendorsList = async (req, res) => {
    const vendors = await vendorService.findVendors()
    return res.status(200).json({
        success: true,
        data: vendors
    })
}

exports.deleteVendor = async (req, res) => {
    const { vendorid } = req.body


    try {
        const deleteUser = await vendorService.deleteVendor({ _id: vendorid })

        if (!deleteUser) {
            return res.status(400).json({
                success: false,
                data: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: "Vendor deleted Successfully"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }

}

exports.adminStats = async (req, res) => {
    try {

        const today = new Date
        const todayepoch = moment(today);

        // Get the epoch timestamp in milliseconds
        const todaysEpochTimestamp = todayepoch.valueOf();

        const users = await userService.countUsers()

        const convertedString = moment(today).format("YYYY-MM-DD");
        const todaysepoch = moment(convertedString)

        // Get the epoch timestamp in milliseconds
        const eventTimestamp = todaysepoch.valueOf();
        // console.log(todaysEpochTimestamp)
        console.log(users)

        const vendors = await vendorService.countVendors()
        const offers = await offerService.countOffers({ expiry: { $gte: todaysEpochTimestamp } })
        const events = await eventService.countEvents({ date: { $gte: eventTimestamp } })

        return res.status(200).json({
            success: true,
            data: {
                users: users,
                vendors: vendors,
                offers: offers,
                events: events
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }


}