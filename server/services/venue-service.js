const VenueModel = require("../models/VenueModel");

class VenueService {
    async findVenue(filter) {
        const venue = VenueModel.findOne(filter);
        return venue;
    }

    async findAllVenue(filter, limit) {
        const venues = VenueModel.find(filter).limit(limit).sort({ date: 1 })
        return venues
    }

    async createVenue(data) {
        const venue = VenueModel.create(data);
        return venue;
    }

    async updateEvent(data) {
        const venue = VenueModel.findOneAndUpdate({ _id: data._id }, data)
        return venue;
    }

    async countVenues() {
        const venues = await VenueModel.countDocuments()
        return venues
    }

    async deleteVenue(filter) {
        const result = await VenueModel.deleteOne(filter)
        return result
    }
}

module.exports = new VenueService();