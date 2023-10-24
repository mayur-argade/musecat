const EventModel = require("../models/EventModel");

class EventService {
    async findEvent(filter) {
        const event = EventModel.findOne(filter).populate('location') // Populates the location data
        .exec();;
        return event;
    }

    async findAllEvents(filter, limit) {
        const events = EventModel.find(filter).limit(limit).sort({ date: 1 }).populate('location vendorid') // Populates the location data
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

    async deleteEvent(filter){
        const event = await EventModel.deleteOne(filter)
        return event
    }

    async countEvents(filter){
        const events = await EventModel.countDocuments(filter)
        return events
    }
}

module.exports = new EventService();