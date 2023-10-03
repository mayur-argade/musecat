const UserModel = require("../models/UserModel");
const tokenService = require("./token-service");
const bcrypt = require('bcrypt')

class UserService {
    async findUser(filter) {
        const user = UserModel.findOne(filter);
        return user;
    }

    async findUsers(filter) {
        const users = UserModel.find(filter).sort({ createdAt: -1 }).limit(3)
        return users
    }
    async createUser(data) {
        data.password = await bcrypt.hash(data.password, 10)
        const user = UserModel.create(data);
        return user;
    }

    async updateUser(data) {
        const user = UserModel.findOneAndUpdate({ _id: data._id }, data)
        return user;
    }

    async deleteUser(filter) {
        const user = await UserModel.deleteOne(filter)
        return user
    }

    async countUsers() {
        const users = await UserModel.countDocuments()
        return users
    }
}

module.exports = new UserService();