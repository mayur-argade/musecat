const statusCode = require('../data/statusCode')
const cloudinary = require('cloudinary')
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const categoryService = require('../services/category-service')
const moment = require('moment-timezone')


// vendor side
exports.createEvent = async (req, res) => {
    let { title, displayPhoto, banner, video, shortDescription, description, location, custom, features, termsAndConditions, seatingMap,
        date, categories, eventCategory, whatsapp, instagram, facebook, email, discountOnApp
    } = req.body

    // console.log(title, displayPhoto, banner, shortDescription, description, location, termsAndConditions, date, categories, eventCategory)

    if (!title || !displayPhoto || !banner || !shortDescription || !description || !location || !termsAndConditions || !date || !categories || !eventCategory) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "Required fields are missing"
        })
    }

    console.log(categories)

    for (const category of categories) {
        if (category.price != null && category.price < 100) {
            return res.status(400).json({
                success: false,
                data: "Price should be greater than 100 baisa"
            })
        }
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

        let uploadedVideo = ''
        if (video) {
            uploadedVideo = await cloudinary.v2.uploader.upload(video, {
                folder: "muscat/events",
            })
        }

        const data = {
            title: title,
            displayPhoto: uploadedEventPhoto.secure_url,
            type: 'event',
            banner: uploadedBanner.secure_url,
            video: uploadedVideo.secure_url,
            seatingMap: uploadedSeatingMap.secure_url,
            shortDescription: shortDescription,
            description: description,
            location: location,
            custom: custom,
            features: features,
            termsAndConditions: termsAndConditions,
            date: date,
            categories: categories,
            eventCategory: eventCategory,
            vendorid: req.user._id,
            whatsapp: whatsapp,
            email: email,
            facebook: facebook,
            intagram: instagram,
            discountOnApp: discountOnApp
        }

        // search for category which is selected
        const categorydata = await categoryService.findCategory({
            categoryURL: eventCategory
        })

        // if no category then return error
        if (!categorydata) {
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        }

        event = await eventService.createEvent(data)

        // push event id into the category
        categorydata.events.push(event._id)

        categorydata.save()

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
        date, categories, eventCategory, instagram, facebook, whatsapp, email, discountOnApp, type, seatingMap
    } = req.body

    // if (!title || !displayPhoto || !banner || !shortDescription || !description || !location || !termsAndConditions || !date || !categories || !eventCategory) {
    //     return res.status(statusCode.BAD_REQUEST.code).json({
    //         success: false,
    //         data: "Required fields are missing"
    //     })
    // }

    console.log(categories)
    if (categories) {

        for (const category of categories) {
            if (category.price != null && category.price < 100) {
                return res.status(400).json({
                    success: false,
                    data: "Price should be greater than 100 baisa"
                })
            }
        }
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

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }

        let uploadedVideo = ''
        if (video) {
            uploadedVideo = await cloudinary.v2.uploader.upload(video, {
                folder: "muscat/events",
            })
        }

        let uploadedSeatingMap = '';
        if (seatingMap) {
            uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                folder: "muscat/events",
            })
        }

        const data = {
            _id: eventid,
            title: title,
            displayPhoto: uploadedEventPhoto.secure_url,
            type: type,
            banner: uploadedBanner.secure_url,
            video: uploadedVideo.secure_url,
            seatingMap: uploadedSeatingMap.secure_url,
            shortDescription: shortDescription,
            description: description,
            location: location,
            custom: custom,
            features: features,
            termsAndConditions: termsAndConditions,
            date: date,
            categories: categories,
            eventCategory: eventCategory,
            vendorid: req.user._id,
            facebook: facebook,
            whatsapp: whatsapp,
            instagram: instagram,
            email: email,
            discountOnApp: discountOnApp
        }

        // search for category which is selected
        let categorydata;
        if (eventCategory) {
            categorydata = await categoryService.findCategory({
                categoryURL: eventCategory
            })
            // if no category then return error
            if (!categorydata) {
                return res.status(404).json({
                    success: false,
                    data: "Category not found"
                })
            }
        }


        event = await eventService.updateEvent(data)

        // push event id into the category
        if (categorydata) {
            categorydata.events.push(event._id)
            categorydata.save()
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


    // const { eventid } = req.params

    // const { title, description, date, location, silverSeats, silverPrice, goldSeats, goldPrice, platinumSeats, platinumPrice, displayPhoto, custom, features } = req.body


    // try {

    //     const data = {
    //         _id: eventid,
    //         title: title,
    //         description: description,
    //         date: date,
    //         location: location,
    //         silverSeats: silverSeats,
    //         silverPrice: silverPrice,
    //         goldSeats: goldSeats,
    //         goldPrice: goldPrice,
    //         platinumSeats: platinumSeats, platinumPrice: platinumPrice, displayPhoto: displayPhoto,
    //         custom: custom,
    //         features: features
    //     }

    //     const event = await eventService.updateEvent(data)
    //     const updatedEvent = await eventService.findEvent({ _id: eventid })
    //     return res.status(200).json({
    //         success: true,
    //         data: updatedEvent
    //     })

    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({
    //         success: false,
    //         data: "internal service error"
    //     })
    // }
}

exports.createOffer = async (req, res) => {
    let { title, displayPhoto, banner, video, shortDescription, description, location, custom, features, termsAndConditions,
        date, categories, eventCategory
    } = req.body

    // if (!title || !displayPhoto || !banner || !shortDescription || !description || !location || !termsAndConditions || !date || !categories || eventCategory) {
    //     return res.status(statusCode.BAD_REQUEST.code).json({
    //         success: false,
    //         data: "Required fields are missing"
    //     })
    // }

    console.log(categories)

    for (const category of categories) {
        if (category.price != null && category.price < 100) {
            return res.status(400).json({
                success: false,
                data: "Price should be greater than 100 baisa"
            })
        }
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

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }

        let uploadedVideo = ''
        if (video) {
            uploadedVideo = await cloudinary.v2.uploader.upload(video, {
                folder: "muscat/events",
            })
        }

        // if (date.type == 'dateRange') {
        //     let { dateRange } = date
        //     const userTimezone = 'Asia/Muscat'; // User's local timezone (optional)
        //     let temp = dateRange.startDate
        //     let temp2 = dateRange.endDate

        //     dateRange.startDate = moment(temp).tz(userTimezone).utc().format();
        //     dateRange.endDate = moment(temp2).tz(userTimezone).utc().format();
        // }

        const data = {
            title: title,
            type: 'offer',
            displayPhoto: uploadedEventPhoto.secure_url,
            banner: uploadedBanner.secure_url,
            video: uploadedVideo.secure_url,
            shortDescription: shortDescription,
            description: description,
            location: location,
            custom: custom,
            features: features,
            termsAndConditions: termsAndConditions,
            date: date,
            categories: categories,
            eventCategory: eventCategory,
            vendorid: req.user._id
        }

        // search for category which is selected
        const categorydata = await categoryService.findCategory({
            categoryURL: eventCategory
        })

        // if no category then return error
        if (!categorydata) {
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        }

        event = await eventService.createEvent(data)

        // push event id into the category
        categorydata.events.push(event._id)

        categorydata.save()

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

exports.getVendorAllEventsNOffers = async (req, res) => {
    const vendor = req.user

    // console.log(vendor)
    const today = new Date()
    // const today = moment().utc()
    console.log(today)
    const currentDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    console.log(currentDay)

    try {
        const events = await eventService.findAllEvents({
            vendorid: vendor,
            // type: 'event',
            // verified: true,
            $or: [
                { // Events with start date greater than or equal to today
                    'date.dateRange.endDate': { $gte: today }
                },
                { // Events with recurring field containing today's day
                    'date.recurring': { $in: currentDay },
                },
            ],

        })

        const expiredEvent = await eventService.findAllEvents({
            vendorid: vendor,
            // type: 'event',
            // verified: true,
            $and: [
                { // Events with start date greater than or equal to today
                    'date.dateRange.endDate': { $lt: today }
                },
                { // Events with recurring field containing today's day
                    'date.recurring': { $nin: currentDay },
                },
            ],
        })
        const offers = await eventService.findAllEvents(
            {
                vendorid: vendor, // Assuming you pass the vendor id as a route parameter
                type: 'offer',
                // verified: true,
                $or: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring': { $in: currentDay },
                    },
                ],
            }
        )

        const expiredOffers = await eventService.findAllEvents(
            {
                vendorid: vendor, // Assuming you pass the vendor id as a route parameter
                type: 'offer',
                // verified: true,
                $and: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.endDate': { $lt: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring': { $nin: currentDay },
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
    }
}

exports.vendorHome = async (req, res) => {
    const { _id } = req.user

    try {
        const today = new Date()
        // const today = moment().utc()
        console.log(today)
        const currentDay = moment().format('dddd').toLowerCase()
        console.log(currentDay)
        // const currentDay = "sunday"
        const events = await eventService.findAllEvents(
            {
                vendorid: _id, // Assuming you pass the vendor id as a route parameter
                // type: 'event',
                // verified: true,
                $or: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring': { $in: currentDay },
                    },
                ],
            }
        )

        const offers = await eventService.findAllEvents(
            {
                vendorid: _id, // Assuming you pass the vendor id as a route parameter
                type: 'offer',
                // verified: true,
                $or: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring': { $in: [currentDay] },
                    },
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
        const user = await userService.findUser({ _id: _id });

        // Find the event by ID
        const event = await eventService.findEvent({ _id: eventid });

        console.log(user, event)

        if (!user || !event) {
            return res.status(404).json({ success: false, message: 'User or Event not found' });
        }

        // Check if the user's ID is in the event's 'likes' array
        const isLiked = event.likes.includes(_id);

        if (isLiked) {
            // If the user's ID is in the 'likes' array, remove it
            event.likes = event.likes.filter(userId => userId !== _id);
            // Remove the event ID from the user's 'favorites' array if present
            user.favorites = user.favorites.filter(eventid => eventid !== event._id);
            // Save the updated event and user data
            await event.save();
            await user.save();

            return res.status(200).json({ success: true, message: 'like has been removed' });
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
            return res.status(200).json({ success: true, message: 'like has been added' });
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
            // verified: true
        };
        if (customDate) {
            const filterDate = new Date(customDate);
            const currentDay = moment(filterDate).format('dddd').toLowerCase()
            query['$or'] = [
                {
                    'date.dateRange.startDate': { $lte: filterDate },
                    'date.dateRange.endDate': { $gte: filterDate }
                }
                ,
                {
                    'date.recurring': { $in: [currentDay] } // Replace with a function to get today's day
                }
            ];
            eventsOnDate = await eventService.findAllEvents(query);

        } else {
            const todayDate = new Date();
            const day = moment(todayDate).format('dddd').toLowerCase()
            query['$or'] = [
                {
                    'date.dateRange.endDate': { $gte: todayDate }
                }
                ,
                {
                    'date.recurring': { $in: [day] } // Replace with a function to get today's day
                }
            ];
            eventsOnDate = await eventService.findAllEvents(query);
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

// yet to done this is for map screen here you have to pass venue lat lon also
exports.whereToMap = async (req, res) => {

}

// --------------------offers -------------------


exports.getAllOffers = async (req, res) => {

    try {

        const today = new Date()

        // const today = moment().utc()
        // console.log(today)
        // const currentDay = moment().format('dddd').toLowerCase()
        // console.log(currentDay)
        // const currentDay = "sunday"
        offers = await eventService.findAllEvents(
            {
                // Assuming you pass the vendor id as a route parameter
                type: 'event',
                // verified: true,
                $or: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
                    },
                ],
            }
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