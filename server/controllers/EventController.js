const statusCode = require('../data/statusCode')
const cloudinary = require('cloudinary')
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const categoryService = require('../services/category-service')
const CategoryModel = require('../models/CategoryModel')
const moment = require('moment-timezone')
const EventModel = require('../models/EventModel')


// vendor side
exports.createEvent = async (req, res) => {
    let { title, description, showEndDate, shortDescription, location, venueInfo, custom, features, termsAndConditions, categories, eventCategory, displayPhoto, banner, date, additinalImages, video, seatingMap, facebook, instagram, email, whatsapp, website, phone, discountOnApp
    } = req.body


    if (!title || !displayPhoto || !shortDescription || !description || !location || !date || !eventCategory) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "Required fields are missing"
        })
    }


    let event = {}

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            // console.log(uploadedEventPhoto)
        }

        let uploadedSeatingMap = ''

        if (seatingMap) {
            uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                folder: "muscat/events",
            })
        }

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }

        let uploadResult;
        let additinalPhotos = []
        if (additinalImages && additinalImages.length != 0) {
            for (let i = 0; i < additinalImages.length; i++) {
                // console.log(additinalImages[i])
                uploadResult = await cloudinary.v2.uploader.upload(additinalImages[i], {
                    folder: "muscat/events",
                })
                additinalPhotos.push(uploadResult.secure_url)
            }
        }

        // console.log(additinalPhotos)

        const data = {
            title: title,
            shortDescription: shortDescription,
            description: description,
            date: date,
            location: location,
            venueInfo: venueInfo,

            eventCategory: eventCategory,
            features: features,

            whatsapp: whatsapp,
            email: email,
            facebook: facebook,
            instagram: instagram,
            phoneNo: phone,
            website: website,

            categories: categories,

            termsAndConditions: termsAndConditions,

            custom: custom,

            vendorid: req.user._id,

            displayPhoto: uploadedEventPhoto.secure_url,
            banner: uploadedBanner.secure_url,
            video: video,
            seatingMap: uploadedSeatingMap.secure_url,
            AdditionalPhotos: additinalPhotos,
            type: 'event',
            showEndDate: showEndDate,
            discountOnApp: discountOnApp
        }

        console.log(date)

        event = await eventService.createEvent(data)

        let categoryData;
        for (let i = 0; i < eventCategory.length; i++) {
            const categoryURL = eventCategory[i].categoryURL;

            // Check in main categories
            categoryData = await categoryService.findCategory({
                categoryURL: categoryURL
            });



            if (!categoryData) {
                // If not found in main categories, search in subcategories of all categories
                categoryData = await categoryService.findSubcategory(categoryURL);

                if (!categoryData) {
                    // If not found in subcategories either, return error
                    return res.status(404).json({
                        success: false,
                        data: "Category not found"
                    });
                }
            }

            categoryData.events.push(event._id)
            categoryData.save()
        }


        res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.updateEvent = async (req, res) => {
    let { eventid, title, displayPhoto, banner, video, shortDescription, description, location, custom, features, termsAndConditions,
        date, categories, eventCategory, instagram, facebook, whatsapp, email, discountOnApp, type, seatingMap, showEndDate, venueInfo, additinalImages, website, phone
    } = req.body


    let event = {}

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            // console.log(uploadedEventPhoto)
        }

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }

        let uploadedSeatingMap = '';
        if (seatingMap) {
            uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                folder: "muscat/events",
            })
        }

        let uploadResult;
        let additinalPhotos = []
        if (additinalImages && additinalImages.length != 0) {
            for (let i = 0; i < additinalImages.length; i++) {
                // console.log(additinalImages[i])
                uploadResult = await cloudinary.v2.uploader.upload(additinalImages[i], {
                    folder: "muscat/events",
                })
                additinalPhotos.push(uploadResult.secure_url)
            }
        }

        const data = {
            _id: eventid,
            title: title,
            shortDescription: shortDescription,
            description: description,

            date: date,
            showEndDate: showEndDate,

            location: location,
            venueInfo: venueInfo,

            eventCategory: eventCategory,
            features: features,

            facebook: facebook,
            instagram: instagram,
            email: email,
            phoneNo: phone,
            whatsapp: whatsapp,
            website: website,


            categories: categories,
            termsAndConditions: termsAndConditions,
            custom: custom,

            displayPhoto: uploadedEventPhoto.secure_url,
            AdditionalPhotos: additinalPhotos,
            seatingMap: uploadedSeatingMap.secure_url,
            banner: uploadedBanner.secure_url,
            video: video,

            type: type,
            discountOnApp: discountOnApp,
        }

        let categoryData;
        for (let i = 0; i < eventCategory.length; i++) {
            const categoryURL = eventCategory[i].categoryURL;

            // Check in main categories
            categoryData = await categoryService.findCategory({
                categoryURL: categoryURL
            });


            event = await eventService.updateEvent(data)

            if (!categoryData) {
                // If not found in main categories, search in subcategories of all categories
                categoryData = await categoryService.findSubcategory(categoryURL);

                if (!categoryData) {
                    // If not found in subcategories either, return error
                    return res.status(404).json({
                        success: false,
                        data: "Category not found"
                    });
                }
            }

            if (!categoryData.events.includes(event._id)) {
                categoryData.events.push(event._id)
            }
            categoryData.save()
        }

        res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        })
    }

}

exports.createOffer = async (req, res) => {
    let { title, description, shortDescription, showEndDate, location, venueInfo, custom, features, termsAndConditions, categories, eventCategory, displayPhoto, banner, date, additinalImages, video, seatingMap, facebook, instagram, email, whatsapp, website, phone, discountOnApp
    } = req.body

    if (!title || !displayPhoto || !shortDescription || !description || !location || !date || !categories || !eventCategory) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "Required fields are missing"
        })
    }

    let event = {}

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            // console.log(uploadedEventPhoto)
        }

        let uploadedSeatingMap = ''

        if (seatingMap) {
            uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                folder: "muscat/events",
            })
        }

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }



        let uploadResult;
        let additinalPhotos = []
        if (additinalImages && additinalImages.length != 0) {
            for (let i = 0; i < additinalImages.length; i++) {
                // console.log(additinalImages[i])
                uploadResult = await cloudinary.v2.uploader.upload(additinalImages[i], {
                    folder: "muscat/events",
                })
                additinalPhotos.push(uploadResult.secure_url)
            }
        }


        const data = {
            title: title,
            shortDescription: shortDescription,
            description: description,
            date: date,
            location: location,
            venueInfo: venueInfo,

            eventCategory: eventCategory,
            features: features,

            whatsapp: whatsapp,
            email: email,
            facebook: facebook,
            instagram: instagram,
            phoneNo: phone,
            website: website,

            categories: categories,

            termsAndConditions: termsAndConditions,

            custom: custom,

            vendorid: req.user._id,

            displayPhoto: uploadedEventPhoto.secure_url,
            banner: uploadedBanner.secure_url,
            video: video,
            seatingMap: uploadedSeatingMap.secure_url,
            AdditionalPhotos: additinalPhotos,

            type: 'offer',

            showEndDate: showEndDate,
            discountOnApp: discountOnApp
        }

        event = await eventService.createEvent(data)

        let categoryData;
        for (let i = 0; i < eventCategory.length; i++) {
            const categoryURL = eventCategory[i].categoryURL;

            // Check in main categories
            categoryData = await categoryService.findCategory({
                categoryURL: categoryURL
            });



            if (!categoryData) {
                // If not found in main categories, search in subcategories of all categories
                categoryData = await categoryService.findSubcategory(categoryURL);

                if (!categoryData) {
                    // If not found in subcategories either, return error
                    return res.status(404).json({
                        success: false,
                        data: "Category not found"
                    });
                }
            }

            categoryData.events.push(event._id)
            categoryData.save()
        }


        res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.getEventById = async (req, res) => {
    const { eventid } = req.params

    if (!eventid) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: statusCode.BAD_REQUEST.message
        })
    }
    try {
        const event = await eventService.findEvent({ _id: eventid })
        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: statusCode.INTERNAL_SERVER_ERROR.message
        })
    }


}

exports.getAllEvents = async (req, res) => {
    try {
        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
        const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        query = {
            archived: false,
            verified: true,
            type: 'event',
            $or: [
                {
                    'date.dateRange.endDate': { $gte: todayDate }
                },
                {
                    'date.dateRange.endDate': null
                }
                ,
                {
                    $and: [
                        {
                            $or: [
                                {
                                    'date.recurring.endDate': { $gte: todayDate },
                                    'date.recurring.days': { $in: day } // Replace with a function to get today's day

                                },
                                {
                                    'date.recurring.endDate': { $gte: null },
                                    'date.recurring.days': { $in: day } // Replace with a function to get today's day
                                }
                            ]
                        },
                    ]
                },
            ],
        }

        let categoriesWithEvents = await CategoryModel.find().populate({
            path: 'events',
            populate: {
                path: 'location',
            },
            match: query,
        })

        const events = categoriesWithEvents.reduce((acc, category) => {
            acc.push(...category.events);
            return acc;
        }, [])

        return res.status(200).json({
            success: true,
            data: events
        })
    } catch (error) {
        console.log(error)
    }

}

exports.getVendorAllEventsNOffers = async (req, res) => {
    const vendor = req.user

    // console.log(vendor)
    const today = new Date()
    const currentDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


    try {
        const events = await eventService.findAllEvents({
            vendorid: vendor,
            type: 'event',
            archived: false,
            // verified: true,
            $or: [
                {
                    'date.dateRange.endDate': { $gte: today }
                },
                {
                    'date.dateRange.endDate': null
                }
                ,
                {
                    $and: [
                        {
                            $or: [
                                {
                                    // 'date.recurring.startDate': { $lte: today },
                                    'date.recurring.endDate': { $gte: today },
                                    'date.recurring.days': { $in: currentDay }
                                },
                                {
                                    // 'date.recurring.startDate': { $lte: today },
                                    'date.recurring.endDate': { $gte: null },
                                    'date.recurring.days': { $in: currentDay }
                                }
                            ]
                        },
                    ]
                },
            ],

        })

        const expiredEvent = await eventService.findAllEvents({
            vendorid: vendor,
            type: 'event',
            // verified: true,
            $or: [
                {
                    'date.dateRange.endDate': { $lt: today }
                },
                { archived: true }
                ,
                {
                    // 'date.recurring.startDate': { $lte: today },
                    'date.recurring.endDate': { $lt: today },
                },
            ],

        })

        const offers = await eventService.findAllEvents(
            {
                vendorid: vendor,
                type: 'offer',
                // verified: true,
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: today }
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        // 'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: today },
                                        'date.recurring.days': { $in: currentDay }
                                    },
                                    {
                                        // 'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: null },
                                        'date.recurring.days': { $in: currentDay }
                                    }
                                ]
                            },
                        ]
                    },
                ],

            }
        )

        const expiredOffers = await eventService.findAllEvents(
            {
                vendorid: vendor,
                type: 'offer',
                archived: true,
                // verified: true,
                $or: [
                    {
                        'date.dateRange.endDate': { $lt: today }
                    }
                    ,
                    {
                        // 'date.recurring.startDate': { $lte: today },
                        'date.recurring.endDate': { $lt: today },
                    },
                ],

            }
        )

        if (!events) {
            return res.status(statusCode.NOT_FOUND.code).json({
                success: false,
                data: statusCode.NOT_FOUND.message
            })
        }

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: {
                events: events,
                expiredEvents: expiredEvent,
                offers: offers,
                expiredOffers: expiredOffers
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}

exports.vendorHome = async (req, res) => {
    const { _id } = req.user

    try {
        const filterDate = moment().format("YYYY-MM-DD")
        const today = new Date(`${filterDate}T23:00:00.000Z`)
        console.log(today)
        // const today = new Date()
        const currentDay = moment().format('dddd').toLowerCase()
        const events = await eventService.findAllEvents(
            {
                vendorid: _id,
                type: 'event',
                verified: true,
                archived: false,
                $or: [
                    {
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    },
                    {
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                'date.recurring.days': { $in: [currentDay] }
                            },
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: today }
                                    },
                                    {
                                        'date.recurring.startDate': null,
                                        'date.recurring.endDate': null
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        )

        const offers = await eventService.findAllEvents(
            {
                vendorid: _id, // Assuming you pass the vendor id as a route parameter
                type: 'offer',
                verified: true,
                archived: false,
                $or: [
                    {
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    }
                    ,
                    {
                        $and: [
                            {
                                'date.recurring.days': { $in: currentDay }
                            },
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: today }
                                    },
                                    {
                                        'date.recurring.startDate': null,
                                        'date.recurring.endDate': null
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        )

        res.status(200).json({
            success: true,
            data: {
                ongoingEvents: events,
                ongoingOffers: offers
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }

}

exports.VendorUnverifiedListings = async (req, res) => {
    const { _id } = req.user

    try {
        const today = new Date()
        const currentDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        const events = await eventService.findAllEvents(
            {
                vendorid: _id, // Assuming you pass the vendor id as a route parameter
                verified: false,
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: today }
                    }
                    ,
                    {
                        $and: [
                            {
                                'date.recurring.days': { $in: currentDay }
                            },
                            {
                                $or: [
                                    {
                                        'date.recurring.endDate': { $gte: today }
                                    },
                                    {
                                        'date.recurring.startDate': null,
                                        'date.recurring.endDate': null
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        )
        return res.status(200).json({
            success: true,
            data: events
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}


exports.addToFavorites = async (req, res) => {
    // console.log(req.user)
    const { _id } = req.user;
    const { eventid } = req.body

    if (_id == null || _id == undefined) {
        return res.status(401).json({
            success: false,
            data: "Try login first"
        })
    }

    // console.log(_id, eventid)
    try {
        // Find the user by ID
        let user = await userService.findUser({ _id: _id });

        // Find the event by ID
        let event = await eventService.findEvent({ _id: eventid });

        // console.log(user, event)

        if (!user || !event) {
            return res.status(404).json({ success: false, message: 'User or Event not found' });
        }

        // Check if the user's ID is in the event's 'likes' array

        const idString = _id.toString();


        if (event.likes.includes(user._id) && user.favorites.includes(event._id)) {
            // If the user's ID is in the 'likes' array, remove it
            likes = event.likes.filter(userId => userId.toString() !== idString);
            // Remove the event ID from the user's 'favorites' array if present
            favorites = user.favorites.filter(eventid => eventid.toString() !== event._id.toString());


            const eventdata = {
                _id: event._id,
                likes: likes
            }
            const updatedEvent = await eventService.updateEvent(eventdata)

            const userData = {
                _id: user._id,
                favorites: favorites
            }

            const updatedUser = await userService.updateUser(userData)

            return res.status(200).json({ success: true, message: 'Removed from favorites' });
        } else {
            // If the user's ID is not in the 'likes' array, add it
            event.likes.push(_id);
            // Add the event ID to the user's 'favorites' array if not already present
            if (!user.favorites.includes(event._id)) {
                user.favorites.push(event._id);
            }
            // Save the updated event and user data
            await event.save();
            await user.save();
            return res.status(200).json({ success: true, message: 'Added to favorites' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports.customQue = async (req, res) => {
    const eventid = req.params.eventid

    try {
        const eventQue = await eventService.findEvent({ _id: eventid })
        let data = eventQue.custom
        return res.status(200).json({
            success: true,
            data: data
        })

    } catch (error) {
        console.log(error)
    }
}

// --------------------Client side ---------------
module.exports.getUpcomingEvents = async (req, res) => {
    try {
        let eventsOnDate;
        // Check if a date is provided in the request query
        const customDate = req.query.date
        console.log(customDate)
        let query = {
            verified: true,
            archived: false
        };
        if (customDate) {
            const timestampFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
            const filterDate = new Date(`${customDate}T23:00:00.000Z`)
            const filterDate2 = new Date(`${customDate}T00:00:00.000Z`)

            // // Convert the formatted date string to a JavaScript Date object
            // const filterDate = new Date(endOfDay);
            console.log(filterDate)
            const currentDay = moment(filterDate).format('dddd').toLowerCase()
            query['$or'] = [
                {
                    'date.dateRange.startDate': { $lte: filterDate },
                    'date.dateRange.endDate': { $gte: filterDate2 }
                },
                {
                    'date.dateRange.startDate': { $lte: filterDate },
                    'date.dateRange.endDate': null
                }
                ,
                {
                    $and: [
                        {
                            $or: [
                                {
                                    'date.recurring.startDate': { $lte: filterDate },
                                    'date.recurring.endDate': { $gte: filterDate2 },
                                    'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                },
                                {
                                    'date.recurring.startDate': { $lte: filterDate },
                                    'date.recurring.endDate': { $gte: null },
                                    'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                }
                            ]
                        },
                    ]
                },
            ];
            eventsOnDate = await eventService.findAllEvents(query);

        } else {
            const filterDate = moment().format("YYYY-MM-DD")
            const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
            const day = moment(todayDate).format('dddd').toLowerCase()
            query['$or'] = [
                {
                    'date.dateRange.endDate': { $gte: todayDate }
                },
                {
                    'date.dateRange.endDate': null
                }
                ,
                {
                    $and: [
                        {
                            $or: [
                                {
                                    'date.recurring.endDate': { $gte: todayDate },
                                    'date.recurring.days': { $in: day } // Replace with a function to get today's day

                                },
                                {
                                    'date.recurring.endDate': { $gte: null },
                                    'date.recurring.days': { $in: day } // Replace with a function to get today's day
                                }
                            ]
                        },
                    ]
                },
            ];
            eventsOnDate = await eventService.findAllEvents(query, 4);
        }

        // Send the events happening on the specified date as a response
        res.status(200).json({
            success: true,
            data: eventsOnDate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.getTrendingEvents = async (req, res) => {

    let events;

    const today = new Date()
    // const today = moment().utc()
    console.log(today)

    // const currentDay = "sunday"
    const query = {
        verified: true,
        trending: true,
        type: 'event',
        $or: [
            { // Events with start date greater than or equal to today
                'date.dateRange.endDate': { $gte: today }
            },
            { // Events with recurring field containing today's day
                'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
            },
        ],

    }

    events = await eventService.findAllEvents(query)

    let trendingEvents = []

    for (const event of events) {
        if (event.trending == true) {
            trendingEvents.push(event)
        }

        for (const category of event.categories) {
            if (category.bookedSeats.length / category.seats >= 0.8 && category.bookedSeats.length / category.seats < 1) {
                trendingEvents.push(event)
            }
        }

    }

    if (trendingEvents.length < 4) {
        let i = 0
        while (trendingEvents.length < 4) {
            trendingEvents.push(events[i])
            i++
        }

    }

    console.log(trendingEvents.length)

    for (let i = 0; i < trendingEvents.length; i++) {
        if (trendingEvents[i] == null) {
            trendingEvents.pop(trendingEvents[i])
        }
    }

    res.status(200).json({
        success: true,
        data: events
    })
}


exports.getDateWiseEvents = async (req, res) => {
    try {

        const events = await EventModel.find().sort({ 'date.dateRange.startDate': 1 }).populate('location');

        // Organize events into groups based on date
        const groupedEvents = events.reduce((acc, event) => {
            let date;
            if (event.date.type === 'dateRange') {
                date = moment(event.date.dateRange.startDate).startOf('day').format('YYYY-MM-DD');
            } else if (event.date.type === 'recurring') {
                // For recurring events, use start date
                date = moment(event.date.recurring.startDate).startOf('day').format('YYYY-MM-DD');
            }
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(event);
            return acc;
        }, {});

        return res.status(200).json(groupedEvents);

    } catch (error) {
        console.log(error)
    }
}
// --------------------offers -------------------


exports.getAllOffers = async (req, res) => {

    try {

        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
        const day = moment(todayDate).format('dddd').toLowerCase()
        offers = await eventService.findAllEvents(
            {
                // Assuming you pass the vendor id as a route parameter
                type: 'offer',
                verified: true,
                archived: false,
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.endDate': { $gte: todayDate },
                                        'date.recurring.days': { $in: day } // Replace with a function to get today's day

                                    },
                                    {
                                        'date.recurring.endDate': { $gte: null },
                                        'date.recurring.days': { $in: day } // Replace with a function to get today's day
                                    }
                                ]
                            },
                        ]
                    },
                ],
            },
            4
        )

        return res.status(200).json({
            success: true,
            data: offers
        })

    } catch (error) {
        console.log(error)
    }

}

exports.deleteOffer = async (req, res) => {
    console.log(req.body)
    const offerid = req.body.offerid
    console.log(offerid)
    try {

        const offer = await offerService.deleteOffer(offerid)
        console.log(offer)
        if (offer) {
            return res.status(200).json({
                success: true,
                data: "Offer deleted successfully"
            })

        } else {
            return res.status(400).json({
                success: true,
                data: "something went wrong"
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

exports.deleteEvent = async (req, res) => {
    const { eventid } = req.body

    try {
        const event = await eventService.deleteEvent({ _id: eventid })
        if (!event) {
            return res.status(400).json({
                success: true,
                data: "something went wrong"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: "Event deleted successfully"
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

exports.getVendorAllEvents = async (req, res) => {

    const { vendorid } = req.params

    console.log(vendorid)
    try {
        const events = await eventService.findAllEvents({ vendorid: vendorid })

        // if (!events) {
        //     return res.status(404).json({
        //         success: false,
        //         data: "no events found"
        //     })
        // }

        return res.status(200).json({
            success: true,
            data: events
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getEventsForAdmin = async (req, res) => {
    try {
        let eventsOnDate;
        let query = {
            // verified: true
            type: 'event'
        };
        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
        const day = moment(todayDate).format('dddd').toLowerCase()

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

        eventsOnDate = await eventService.findAllEvents(query, 5);
        res.status(200).json({
            success: true,
            data: eventsOnDate,
        })
    } catch (error) {
        console.log(error)
    }

}

exports.getOffersForAdmin = async (req, res) => {
    try {
        let eventsOnDate;
        let query = {
            // verified: true
            type: 'offer'
        };
        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
        const day = moment(todayDate).format('dddd').toLowerCase()

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

        eventsOnDate = await eventService.findAllEvents(query);
        res.status(200).json({
            success: true,
            data: eventsOnDate,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.adminVerifyEvent = async (req, res) => {

    const { eventid } = req.body.data
    console.log(req.body)

    try {
        let event = await eventService.findEvent({ _id: eventid })
        console.log(event)

        if (!event) {
            return res.status(404).json({
                success: false,
                data: "Event not found"
            })
        } else if (event.location.verified == false) {
            return res.status(400).json({
                succss: false,
                data: `Please Verify Venue ${event.location.name} first which is associated with this event `
            })
        }

        const updatedData = {
            _id: eventid,
            verified: true
        }

        event = await eventService.updateEvent(updatedData)

        return res.status(200).json({
            success: true,
            data: "Event Verified Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}