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

module.exports.getVenueDetails = async (req, res) => {
    const venueid = req.params.venueid
    console.log(venueid)

    try {

        const venuedata = await venueService.findVenue({ _id: venueid })

        const categories = await categoryService.findAllCategory()
        let categoryArray = [];
        let events;
        for (const category of categories) {
            categoryArray.push(category.categoryURL)
        }

        const today = new Date()
        // const today = moment().utc()
        console.log(today)
        const currentDay = moment().format('dddd').toLowerCase()
        console.log(currentDay)

        // const currentDay = "sunday"
        const query = {
            // type: 'event',
            $and: [
                { 'eventCategory': { $in: categoryArray } },
                { 'location': venuedata._id }
            ],
            $or: [
                { // Events with start date greater than or equal to today
                    'date.dateRange.endDate': { $gte: today }
                },
                { // Events with recurring field containing today's day
                    'date.recurring': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
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
        const venues = await venueService.findAllVenue({ verified: true })
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