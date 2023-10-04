const CategoryModel = require("../models/CategoryModel");

class CategoryService {
    async findCategory(filter) {
        const category = CategoryModel.findOne(filter);
        return category;
    }

    async findAllCategory(filter, limit) {
        const categories = CategoryModel.find(filter).limit(limit).sort({ date: 1 })
        return categories
    }

    async createCategories(data) {
        const category = CategoryModel.create(data);
        return category;
    }

    async updateCategory(data) {
        const category = CategoryModel.findOneAndUpdate({ _id: data._id }, data)
        return category;
    }

    async deleteCategory(filter){
        const category = CategoryModel.deleteOne(filter)
        return category
    }

    async countCategory(filter){
        const category = await CategoryModel.countDocuments(filter)
        return category
    }

}

module.exports = new CategoryService();