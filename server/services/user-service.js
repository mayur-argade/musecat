const UserModel = require("../models/UserModel");
const tokenService = require("./token-service");
const bcrypt = require('bcrypt')

class UserService {
    async findUser(filter, select) {
        const user = UserModel.findOne(filter)
        return user;
    }

    async finduserAndPopulate(filter) {
        const user = await UserModel.findOne(filter)
            .populate({
                path: 'BookedTickets',
                populate: {
                    path: 'eventid',
                    populate: {
                        path: 'location'
                    }
                }
            })
            .select('BookedTickets')
            .sort({ 'BookedTickets.createdAt': -1 });

        return user;
    }

    async findUsers(filter, limit) {
        const users = UserModel.find(filter).sort({ createdAt: -1 }).limit(limit)
        return users
    }

    async findAllUsers(filter) {
        const users = UserModel.find(filter).sort({ createdAt: -1 })
        return users
    }
    async createUser(data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }
        const user = UserModel.create(data);
        return user;
    }

    async updateUser(data) {

        // console.log(data)
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }
        const user = UserModel.findOneAndUpdate({ _id: data._id }, data)
        return user;
    }

    async deleteUser(filter) {
        const user = await UserModel.deleteOne(filter)
        return user
    }

    async findAndUpdateUser(filter, data) {
        const user = await UserModel.findOneAndUpdate(filter, data)
        return user
    }

    async countUsers() {
        const users = await UserModel.countDocuments()
        return users
    }
}

module.exports = new UserService();