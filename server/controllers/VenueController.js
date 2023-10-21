const eventService = require('../services/event-service')
const venueService = require('../services/venue-service')
const cloudinary = require('cloudinary')

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
    const venue = req.params.venue

    try {

        const venuedata = await venueService.findVenue({ _id: venue })
        const events = await eventService.findAllEvents({ location: venuedata.name })
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
        const venues = await venueService.findAllVenue({name: 'Crown Plaza'})
        return res.status(200).json({
            success: true,
            data: venues
        })
    } catch (error) {
        console.log(error)
    }
}