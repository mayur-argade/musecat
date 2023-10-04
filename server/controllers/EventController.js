const statusCode = require('../data/statusCode')
const cloudinary = require('cloudinary')
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const categoryService = require('../services/category-service')
const moment = require('moment')

// used epoch timstamp and didn't handle this restaurant thing
exports.createEvent = async (req, res) => {
    const { title, description, category, date, time, location, silverSeats, silverPrice, goldSeats, goldPrice, platinumSeats, platinumPrice, displayPhoto, custom, features } = req.body

    if (!title, !description, !category || !date || !location || !silverSeats || !silverPrice || !goldSeats || !goldPrice || !platinumSeats || !platinumPrice) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "All fields are mandatory"
        })
    }

    let event = {}
    if ((silverPrice || platinumPrice || goldPrice) < 100) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "Order sum can not be less than 100 Baisa"
        })
    }

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            console.log(uploadedEventPhoto)
        }
        const dateMoment = moment.utc(date, "YYYY-MM-DD")

        console.log(dateMoment)
        // Get the epoch timestamp in milliseconds
        const epochDate = dateMoment.valueOf();

        const data = {
            title: title,
            description: description,
            date: epochDate,
            location: location,
            silverSeats: silverSeats,
            silverPrice: silverPrice,
            goldSeats: goldSeats,
            goldPrice: goldPrice,
            platinumSeats: platinumSeats, platinumPrice: platinumPrice, displayPhoto: displayPhoto,
            custom: custom,
            category: category,
            features: features,
            vendorid: req.user._id,
            displayPhoto: uploadedEventPhoto.secure_url
        }

        // search for category which is selected
        const categorydata = await categoryService.findCategory({
            categoryURL: category
        })

        console.log(categorydata)

        // if no category then return error
        if (!categorydata) {
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        }

        event = await eventService.createEvent(data)

        // push offer id into the category
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

    console.log(vendor)

    try {
        const events = await eventService.findAllEvents({ vendorid: vendor })
        const offers = await offerService.findAllOffer({ vendorid: vendor })
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
                offers: offers
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateEvent = async (req, res) => {
    const { eventid } = req.params

    const { title, description, date, location, silverSeats, silverPrice, goldSeats, goldPrice, platinumSeats, platinumPrice, displayPhoto, custom, features } = req.body


    try {

        const data = {
            _id: eventid,
            title: title,
            description: description,
            date: date,
            location: location,
            silverSeats: silverSeats,
            silverPrice: silverPrice,
            goldSeats: goldSeats,
            goldPrice: goldPrice,
            platinumSeats: platinumSeats, platinumPrice: platinumPrice, displayPhoto: displayPhoto,
            custom: custom,
            features: features
        }

        const event = await eventService.updateEvent(data)
        const updatedEvent = await eventService.findEvent({ _id: eventid })
        return res.status(200).json({
            success: true,
            data: updatedEvent
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "internal service error"
        })
    }


}

exports.vendorHome = async (req, res) => {
    const { _id } = req.user

    try {
        const today = new Date()
        const events = await eventService.findAllEvents({ vendorid: _id, date: { $gte: today } }, 3)

        const offers = await offerService.findAllOffer({ vendorid: _id }, 4)

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
    const { _id } = req.user;
    const { eventid } = req.body

    console.log(_id, eventid)
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
        if (customDate) {

            // Convert the input date to a moment object
            const dateMoment = moment.utc(customDate, "YYYY-MM-DD")

            // console.log(dateMoment)
            // Get the epoch timestamp in milliseconds
            const epochTimestamp = dateMoment.valueOf();
            // console.log()
            // Find events happening on the specified date
            eventsOnDate = await eventService.findAllEvents({
                date: {
                    $eq: epochTimestamp,
                },
            });

        } else {
            const today = new Date
            const convertedString = moment(today).format("YYYY-MM-DD");
            const todayepoch = moment(convertedString)

            // Get the epoch timestamp in milliseconds
            const todaysEpochTimestamp = todayepoch.valueOf();

            eventsOnDate = await eventService.findAllEvents({
                date: {
                    $gte: todaysEpochTimestamp,
                },
            });
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
exports.createOffer = async (req, res) => {
    // get data from the frontend
    const { title, description, photo, banner, video, shortDescription, location, expiry, startdate, category } = req.body

    // null check for required fields
    if (!title || !description || !expiry || !startdate) {
        return res.status(401).json({
            success: false,
            data: "Bad request"
        })
    }

    try {
        // upload photo to cloudinary
        let uploadedPhoto = ''
        if (photo) {
            uploadedPhoto = await cloudinary.v2.uploader.upload(photo, {
                folder: "muscat/offers",
            })
        }

        // upload video to cloudinary
        let uploadedVideo;
        let videourl
        if (video) {
            uploadedVideo = await cloudinary.v2.uploader.upload(video, {
                folder: "muscat/offers"
            })
            videourl = uploadedVideo.secure_url
        }

        // initialise data to save in catgories
        let data = {
            title: title,
            description: description,
            expiry: expiry,
            banner: banner,
            video: videourl,
            shortDescription: shortDescription, location: location,
            category: category,
            startdate: startdate,
            vendorid: req.user._id,
            photo: uploadedPhoto.secure_url
        }

        // search for category which is selected
        const categorydata = await categoryService.findCategory({
            categoryURL: category
        })

        console.log(categorydata)

        // if no category then return error
        if (!categorydata) {
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        }

        // if found category then create a offer
        const offer = await offerService.createOffer(data)

        // push offer id into the category
        categorydata.offers.push(offer._id)

        categorydata.save()

        return res.status(200).json({
            success: true,
            data: {
                offer: offer,
                category: categorydata
            }
        })

    } catch (error) {
        console.log(error)
    }

}

exports.getAllOffers = async (req, res) => {

    const today = new Date
    const todayepoch = moment(today);

    // Get the epoch timestamp in milliseconds
    const todaysEpochTimestamp = todayepoch.valueOf();

    try {
        const offers = await offerService.findAllOffer({ expiry: { $gte: todaysEpochTimestamp } }, 4)
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