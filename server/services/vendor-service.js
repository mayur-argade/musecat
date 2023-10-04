const VendorModel = require("../models/VendorModel");
const tokenService = require("./token-service");
const bcrypt = require('bcrypt')

class VendorService {
    async findVendor(filter) {
        const vendor = VendorModel.findOne(filter);
        return vendor;
    }

    async findVendors(filter) {
        const vendors = VendorModel.find(filter);
        return vendors
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

    async countVendors() {
        const vendors = await VendorModel.countDocuments()
        return vendors
    }

    async deleteVendor(filter){
        const vendor = await VendorModel.deleteOne(filter)
        return vendor
    }

}

module.exports = new VendorService();