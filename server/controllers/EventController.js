const statusCode = require('../data/statusCode')
const cloudinary = require('cloudinary')
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')

exports.createEvent = async (req, res) => {
    const { title, description, category, date, time, location, silverSeats, silverPrice, goldSeats, goldPrice, platinumSeats, platinumPrice, displayPhoto, custom, features } = req.body

    if (!title, !description, !category || !date || !location || !silverSeats || !silverPrice || !goldSeats || !goldPrice || !platinumSeats || !platinumPrice) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "All fields are mandatory"
        })
    }

    let event = {}

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            console.log(uploadedEventPhoto)
        }
        const data = {
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
            category: category,
            features: features,
            vendorid: req.user._id,
            displayPhoto: uploadedEventPhoto.secure_url
        }

        event = await eventService.createEvent(data)

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

exports.createOffer = async (req, res) => {
    const { title, description, photo, expiry, startdate } = req.body

    if (!title || !description || !expiry || !startdate) {
        return res.status(401).json({
            success: false,
            data: "Bad request"
        })
    }

    try {
        let uploadedPhoto = ''
        if (photo) {
            uploadedPhoto = await cloudinary.v2.uploader.upload(photo, {
                folder: "muscat/events",
            })
        }

        let data = {
            title: title,
            description: description,
            expiry: expiry,
            startdate: startdate,
            vendorid: req.user._id,
            photo: uploadedPhoto.secure_url
        }

        const offer = await offerService.createOffer(data)

        return res.status(200).json({
            success: true,
            data: offer
        })

    } catch (error) {
        console.log(error)
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
    const { eventid } = req.params;

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
        } else {
            // If the user's ID is not in the 'likes' array, add it
            event.likes.push(_id);
            // Add the event ID to the user's 'favorites' array if not already present
            if (!user.favorites.includes(event._id)) {
                user.favorites.push(event._id);
            }
        }

        // Save the updated event and user data
        await event.save();
        await user.save();

        res.status(200).json({ success: true, message: 'Operation completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports.getUpcomingEvents = async (req, res) => {
    try {
        // Check if a date is provided in the request query
        const customDate = req.query.date || new Date().toISOString().split('T')[0];

        console.log(customDate)
        // Calculate the start and end of the specified date
        const startOfDay = new Date(customDate);
        startOfDay.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)

        const endOfDay = new Date(customDate);
        endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day (23:59:59.999)

        console.log(startOfDay, endOfDay)

        // Find events happening on the specified date
        const eventsOnDate = await eventService.findAllEvents({
            date: {
                $gte: startOfDay,
            },
        });

        // Check if there are no events on the specified date
        if (eventsOnDate.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No events are happening on the specified date.',
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

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await offerService.findAllOffer({}, 4)
        return res.status(200).json({
            success: true,
            data: offers
        })
    } catch (error) {
        console.log(error)
    }

}