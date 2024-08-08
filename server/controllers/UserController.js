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
const { transporter } = require('../services/mail-service')
const { contactUsEmail } = require('../data/emailTemplates');
const { db } = require('../config/firebase');
const axios = require('axios')

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

        let statusVerified = req.user.isVerified;
        let emailVerified = req.user.emailVerified;
        if (req.user.email != email) {
            emailVerified = false
            statusVerified = false
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
            crImage: uploadedCrImage.secure_url,
            isVerified: statusVerified,
            emailVerified: emailVerified

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
            const photoBuffer = Buffer.from(photo, 'base64');
            if (photoBuffer.length <= 10485760) {
                uploadedPhoto = await cloudinary.v2.uploader.upload(photo, {
                    folder: "muscat/user",
                })
            } else {
                return res.status(400).json({
                    data: 'File size too large. Maximum is 10485760.',
                    success: false
                });
            }
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

        const mailOptions = {
            from: 'argademayur2002@gmail.com',
            to: 'argademayur2002@gmail.com',
            subject: `${firstname} ${lastname} has sent a message`,
            html: contactUsEmail(firstname, lastname, email, message),
        };

        const sendemail = await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                        success: false,
                        data: "failed to send a email, Please check your input email"
                    });
            }
        });


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
        let query = {
            verified: true,
            archived: false,
            type: 'event'
        };
        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
        // const day = moment(todayDate).format('dddd').toLowerCase()

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
                $and: [
                    {
                        'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
                    },
                    {
                        $or: [
                            {
                                'date.recurring.endDate': { $gte: todayDate }
                            },
                            {
                                'date.recurring.endDate': null
                            }
                        ]
                    }
                ]
            }
        ];
        const today = new Date();
        const event = await eventService.findEvent({ _id: eventid })
        const day = moment(today).format('dddd').toLowerCase()

        // let query = {
        //     verified: true,
        //     type: 'event',
        //     archived: false
        // };
        // query['$or'] = [
        //     {
        //         'date.dateRange.endDate': { $gte: today }
        //     },
        //     {
        //         'date.dateRange.endDate': null
        //     }
        //     ,
        //     {
        //         'date.recurring.endDate': { $gte: today } // Replace with a function to get today's day
        //     },
        //     {
        //         'date.recurring.endDate': null // Replace with a function to get today's day
        //     }
        // ];

        eventsOnDate = await eventService.findAllEvents(query, 4);

        const offers = await eventService.findAllEvents({
            verified: true,
            type: 'offer',
            archived: false,
            $or: [
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
                    $and: [
                        {
                            'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
                        },
                        {
                            $or: [
                                {
                                    'date.recurring.endDate': { $gte: todayDate }
                                },
                                {
                                    'date.recurring.endDate': null
                                }
                            ]
                        }
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

        const user = await userService.finduserAndPopulate({ _id: req.user.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "User not found"
            })
        }

        const filteredBookedTickets = user.BookedTickets.filter(ticket => ticket.eventid !== null).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));;


        return res.status(200).json({
            success: true,
            data: {
                pastpurchased: filteredBookedTickets, // Use the response array, not 'res'
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
        const vendors = await vendorService.findVendors({ isVerified: false, emailVerified: true }, 5)

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
    const users = await userService.findAllUsers({ isVerified: true })
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
    try {
        const vendors = await vendorService.findVendors({ role: 'vendor', emailVerified: true })
        return res.status(200).json({
            success: true,
            data: vendors
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.deleteVendor = async (req, res) => {
    const { vendorid } = req.body

    console.log(vendorid)
    try {

        const eventToDelete = await eventService.DeleteMany({ vendorid: vendorid })


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
            data: "Internal server error"
        })
    }

}

exports.adminStats = async (req, res) => {
    try {

        let query = {
            // verified: true
            type: 'offer'
        };

        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
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
                $and: [
                    {
                        'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
                    },
                    {
                        $or: [
                            {
                                'date.recurring.endDate': { $gte: todayDate }
                            },
                            {
                                'date.recurring.endDate': null
                            }
                        ]
                    }
                ]
            }
        ];

        let eventQuery = {
            // archived: false,
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
                $and: [
                    {
                        'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
                    },
                    {
                        $or: [
                            {
                                'date.recurring.endDate': { $gte: todayDate }
                            },
                            {
                                'date.recurring.endDate': null
                            }
                        ]
                    }
                ]
            }
        ];
        const users = await userService.countUsers({ isVerified: true })
        const vendors = await vendorService.countVendors({ role: 'vendor', emailVerified: true })
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
            data: "Internal server error"
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

exports.addUserEmailTofirebase = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        // Check if the email is already present in the database
        const emailQuerySnapshot = await db.collection('subscribers')
            .where('email', '==', email)
            .get();

        if (!emailQuerySnapshot.empty) {
            return res.status(400).json({
                success: false,
                data: 'Email is already subscribed'
            });
        }

        // If email is not found, add it to the collection
        await db.collection('subscribers').add({ email });
        res.status(200).json({
            success: true,
            data: 'Subscribed successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}



exports.getInstagramPosts = async (req, res) => {
    const userId = 'wtfusernomore';
    const accessToken = process.env.INSTAGRAM_TOKEN;
    try {
        // Fetch all media posts' IDs
        const mediaUrl = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`;
        const mediaResponse = await axios.get(mediaUrl);
        const mediaIds = mediaResponse.data.data.map(media => media.id);

        // Get details for the first 6 media posts
        const mediaDetailsPromises = mediaIds.slice(0, 6).map(id => {
            const url = `https://graph.instagram.com/${id}?fields=id,caption,media_type,media_url,username,timestamp&access_token=${accessToken}`;
            return axios.get(url);
        });

        const mediaDetailsResponses = await Promise.all(mediaDetailsPromises);
        const mediaDetails = mediaDetailsResponses.map(response => response.data);

        console.log(mediaDetails)
        // Send media details to the frontend
        res.status(200).json(mediaDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Instagram media.');
    }
};
