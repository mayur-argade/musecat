const eventService = require('../services/event-service')
const categoryService = require('../services/category-service')
const venueService = require('../services/venue-service')
const cloudinary = require('cloudinary')
const moment = require('moment')

module.exports.createVenue = async (req, res) => {
    const { name, photo, address, mapAddress } = req.body

    if (!name || !photo || !address || !mapAddress) {
        return res.status(400).json({
            success: false,
            data: "all field are mandatory"
        })
    }

    try {

        let uploadedVenuePhoto = ''
        if (photo) {
            uploadedVenuePhoto = await cloudinary.v2.uploader.upload(photo, {
                folder: "muscat/venue",
            })
            console.log(uploadedVenuePhoto)
        }

        const data = {
            name: name,
            photo: uploadedVenuePhoto.secure_url,
            address: address,
            coordinates: {
                lat: mapAddress.lat,
                lng: mapAddress.lng
            }
        }

        const venue = await venueService.createVenue(data)

        return res.status(200).json({
            success: true,
            data: venue
        })

    } catch (error) {
        console.log(error)
    }

}

exports.getVenueDetails = async (req, res) => {
    const venueid = req.params.venueid
    console.log(venueid)

    try {

        const venuedata = await venueService.findVenue({ _id: venueid })

        if (!venuedata) {
            return res.status(404).json({
                success: false,
                data: "Venue Not Found"
            })
        }

        const today = new Date()

        let query = {
            // type: 'event',
            verified: true,
            'location': venueid,
            $or: [
                { // Events with start date greater than or equal to today
                    'date.dateRange.endDate': { $gte: today }
                },
                { // Events with recurring field containing today's day
                    $and: [
                        {
                            $or: [
                                {
                                    'date.recurring.endDate': null
                                },
                                {
                                    'date.recurring.endDate': { $gte: today }

                                }
                            ]
                        },
                        {
                            'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
                        }
                    ]
                },
            ],
        }

        events = await eventService.findAllEvents(query)

        return res.status(200).json({
            success: true,
            data: {
                venue: venuedata,
                events: events
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getAllVenues = async (req, res) => {
    try {
        const venues = await venueService.findAllVenue()
        return res.status(200).json({
            success: true,
            data: venues
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getAllVenuesAdmin = async (req, res) => {
    try {
        const venues = await venueService.findAllVenue()
        return res.status(200).json({
            success: true,
            data: venues
        })
    } catch (error) {
        console.log(error)
    }
}

exports.AdminVerifyVenue = async (req, res) => {

    const { venueid } = req.body

    console.log(req.body)

    const venuedata = {
        _id: venueid,
        verified: true
    }

    const venue = await venueService.updateEvent(venuedata)

    res.status(200).json({
        success: true,
        data: venue
    })

}

exports.deleteVenue = async (req, res) => {
    const { venueId } = req.body

    // console.log(req.body)

    try {

        const venue = await venueService.findVenue({ _id: venueId })

        if (!venue) {
            return res.status(404).json({
                success: false,
                data: "Venue Not Found"
            })
        }

        const deletedVenue = await venueService.deleteVenue({ _id: venueId })

        if (deletedVenue.value != null) {
            return res.status(500).json({
                success: false,
                data: "Venue unable to delete"
            })
        }

        return res.status(200).json({
            success: true,
            data: "Venue Deleted successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server error"
        })
    }

}