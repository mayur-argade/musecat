const statusCode = require('../data/statusCode');
const vendorService = require('../services/vendor-service')
const userService = require('../services/user-service')
const categoryService = require('../services/category-service')
const cloudinary = require('cloudinary');
const ContactUsModel = require('../models/ContactUsModel');
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service');
const ticketService = require('../services/ticket-service');
const moment = require('moment');
const venueService = require('../services/venue-service');
const paymentService = require('../services/payment-service')
const notificationService = require('../services/notification-service')

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

    const { email, firstname, lastname, username, mobilenumber, photo } = req.body

    try {
        let uploadedPhoto = ''

        if (photo) {
            uploadedPhoto = await cloudinary.v2.uploader.upload(photo, {
                folder: "muscat/user",
            })
        }

        const data = {
            _id: req.user._id,
            email: email,
            username: username,
            firstname: firstname,
            lastname: lastname,
            photo: uploadedPhoto.secure_url,
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
        const day = moment(today).format('dddd').toLowerCase()

        let query = {
            verified: true,
            type: 'event'
        };
        query['$or'] = [
            {
                'date.dateRange.endDate': { $gte: today }
            }
            ,
            {
                'date.recurring.days': { $in: [day] } // Replace with a function to get today's day
            }
        ];

        eventsOnDate = await eventService.findAllEvents(query, 4);

        const offers = await offerService.findAllOffer({
            verified: true,
            type: 'offer',
            $or: [
                {
                    'data.dateRange.endDate': { $gte: today }
                },
                {
                    $or: [
                        {
                            'date.recurring.endDate': null,
                            'date.recurring.days': { $in: [day] }
                        },
                        {
                            'date.recurring.endDate': { $gte: today },
                            'date.recurring.days': { $in: [day] }
                        },

                    ]
                }
            ]

        }, 4)

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: {
                eventDetails: event,
                upcomingEvents: eventsOnDate,
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

        const response = [];

        for (const ticket of BookedTickets) {
            console.log(ticket)
            if (ticket.eventid != null) {
                const eventobject = ticket.eventid
                // console.log(event)
                response.push(eventobject);
            }
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
    console.log(vendorid)
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

    try {
        const vendors = await vendorService.findVendors({ isVerified: false }, 5)

        return res.status(200).json({
            success: true,
            data: vendors
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }

}

exports.getAllUsers = async (req, res) => {

    try {
        const users = await userService.findUsers({ isVerified: true }, 3)

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
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
        console.log(user)
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

    console.log(vendorid)
    try {
        const deleteUser = await vendorService.deleteVendor({ _id: vendorid })

        if (deleteUser) {
            return res.status(200).json({
                success: true,
                data: "Vendor deleted Successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                data: "Something went wrong"
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

        let query = {
            // verified: true
            type: 'offer'
        };
        const todayDate = new Date();
        const day = moment(todayDate).format('dddd').toLowerCase()
        const days = ['sunday', 'monday', 'tuesday', 'thursday', 'friday', 'saturday']
        query['$or'] = [
            {
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                ]

            }
            ,
            {
                'date.recurring.days': { $in: days } // Replace with a function to get today's day
            }
        ];

        let eventQuery = {
            type: 'event'
        }
        eventQuery['$or'] = [
            {
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                ]
            }
            ,
            {
                'date.recurring.days': { $in: [day] } // Replace with a function to get today's day
            }
        ]
        const users = await userService.countUsers()
        const vendors = await vendorService.countVendors()
        const offers = await eventService.countEvents(query)
        const events = await eventService.countEvents(eventQuery)
        const category = await categoryService.countCategory()
        const venues = await venueService.countVenues()
        console.log(category)
        // const venue = await 

        return res.status(200).json({
            success: true,
            data: {
                users: users,
                vendors: vendors,
                offers: offers,
                events: events,
                category: category,
                venues: venues
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

exports.getVendorsProfile = async (req, res) => {

    const { vendorid } = req.params

    // console.log(req.params)
    try {
        const vendor = await vendorService.findVendor({ _id: vendorid })

        if (!vendor) {
            return res.status(404).json({
                success: false,
                data: "Vendor not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: vendor
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }

}

exports.getPaymentMethods = async (req, res) => {
    const user = req.user

    console.log("user -------->", user)
    const card = await paymentService.listCustomerPaymentMethods(req.user.payment_customer_id)
    res.status(200).json(card)
}