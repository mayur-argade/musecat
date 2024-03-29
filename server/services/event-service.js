const EventModel = require("../models/EventModel");

class EventService {
    async findEvent(filter) {
        const event = EventModel.findOne(filter).populate('location').populate('vendorid').exec();
        return event;
    }

    async findAllEvents(filter, limit) {
        const events = EventModel.find(filter).limit(limit).sort({ createdAt: -1 }).populate('location vendorid') // Populates the location data
            .exec();
        return events
    }

    async createEvent(data) {
        const event = EventModel.create(data);
        return event;
    }

    async updateEvent(data) {
        const event = EventModel.findOneAndUpdate({ _id: data._id }, data)
        return event;
    }

    async deleteEvent(filter) {
        const event = await EventModel.deleteOne(filter)
        return event
    }

    async countEvents(filter) {
        const events = await EventModel.countDocuments(filter)
        return events
    }

    async DeleteMany(filter){
        const events = await EventModel.deleteMany(filter)
    }
}

module.exports = new EventService();