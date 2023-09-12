const EventModel = require("../models/EventModel");

class EventService {
    async findEvent(filter) {
        const event = EventModel.findOne(filter);
        return event;
    }

    async findAllEvents(filter, limit) {
        const events = EventModel.find(filter).limit(limit).sort({ date: 1 })
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

}

module.exports = new EventService();