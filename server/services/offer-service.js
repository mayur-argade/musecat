const OfferModel = require("../models/OfferModel");

class OfferService {
    async findOffer(filter) {
        const offer = OfferModel.findOne(filter);
        return offer;
    }

    async findAllOffer(filter, limit) {
        const offers = OfferModel.find(filter).limit(limit)
        return offers
    }

    async createOffer(data) {
        const offer = OfferModel.create(data);
        return offer;
    }

    async updateOffer(data) {
        const offer = OfferModel.findOneAndUpdate({ _id: data._id }, data)
        return offer;
    }

    async deleteOffer(filter){
        const offer = await OfferModel.findByIdAndDelete(filter)
        return offer
    }

    async countOffers(filter){
        const offers = await OfferModel.countDocuments(filter)
        return offers
    }

}

module.exports = new OfferService();