const PopupModel = require("../models/PopUpModel");

class PopupService {
    async findPopup(filter) {
        const popup = PopupModel.findOne(filter);
        return popup;
    }

    async createPopup(data) {
        const popup = PopupModel.create(data);
        return popup;
    }

    async updatePopup(data) {
        const popup = PopupModel.findOneAndUpdate({ _id: data._id }, data)
        return popup;
    }

}

module.exports = new PopupService();