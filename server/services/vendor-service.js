const VendorModel = require("../models/VendorModel");
const tokenService = require("./token-service");
const bcrypt = require('bcrypt')

class VendorService {
    async findVendor(filter) {
        const vendor = VendorModel.findOne(filter);
        return vendor;
    }

    async findVendors(filter, limit) {
        const vendors = VendorModel.find(filter).limit(limit).sort({ createdAt: -1 });
        return vendors
    }

    async createVendor(data) {
        data.password = await bcrypt.hash(data.password, 10)
        const vendor = VendorModel.create(data);
        return vendor;
    }

    async updateVendor(data) {
        if(data.password){
        data.password = await bcrypt.hash(data.password, 10)
        }
        const vendor = VendorModel.findOneAndUpdate({ _id: data._id }, data)
        return vendor;
    }

    async countVendors() {
        const vendors = await VendorModel.countDocuments()
        return vendors
    }

    async deleteVendor(filter) {
        const vendor = await VendorModel.deleteOne(filter)
        console.log(vendor)
        return vendor
    }

    async findAndUpdateVendor(filter, data) {
        const vendor = await VendorModel.findOneAndUpdate(filter, data)
        return vendor
    }

}

module.exports = new VendorService();