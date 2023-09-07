const eventService = require('../services/event-service')
const venueService = require('../services/venue-service')
const cloudinary = require('cloudinary')

module.exports.createVenue = async (req, res) => {
    const { name, displayPhoto, address } = req.body

    if (!name || !displayPhoto || !address) {
        return res.status(400).json({
            success: false,
            data: "all field are mandatory"
        })
    }

    try {

        let uploadedVenuePhoto = ''
        if (displayPhoto) {
            uploadedVenuePhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/venue",
            })
            console.log(uploadedVenuePhoto)
        }

        const data = {
            name: name,
            displayPhoto: uploadedVenuePhoto.secure_url,
            address: address
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