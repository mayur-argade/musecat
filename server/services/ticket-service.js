const TicketModel = require("../models/TicketModel");

class TicketService {
    async findTicket(filter) {
        const ticket = TicketModel.findOne(filter);
        return ticket;
    }

    async findAllTickets(filter, limit) {
        const tickets = TicketModel.find(filter).limit(limit).sort({ date: 1 })
        return tickets
    }

    async createTicket(data) {
        const ticket = TicketModel.create(data);
        return ticket;
    }

    async updateTicket(data) {
        const ticket = TicketModel.findOneAndUpdate({ _id: data._id }, data)
        return ticket;
    }

}

module.exports = new TicketService();