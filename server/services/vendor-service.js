const VendorModel = require("../models/VendorModel");
const tokenService = require("./token-service");
const bcrypt = require('bcrypt')

class VendorService {
    async findVendor(filter) {
        const vendor = VendorModel.findOne(filter);
        return vendor;
    }

    async createVendor(data) {
        data.password = await bcrypt.hash(data.password, 10)
        const vendor = VendorModel.create(data);
        return vendor;
    }

    async updateVendor(data) {
        const vendor = VendorModel.findOneAndUpdate({ _id: data._id }, data)
        return vendor;
    }

}

module.exports = new VendorService();