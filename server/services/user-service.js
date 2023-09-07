const UserModel = require("../models/UserModel");
const tokenService = require("./token-service");
const bcrypt = require('bcrypt')

class UserService {
    async findUser(filter) {
        const user = UserModel.findOne(filter);
        return user;
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
}

module.exports = new UserService();