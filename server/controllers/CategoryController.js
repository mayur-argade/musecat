const offerService = require("../services/offer-service");
const eventService = require('../services/event-service');
const statusCode = require("../data/statusCode");
const CategoryModel = require('../models/CategoryModel')

exports.createCategory = async (req, res) => {



}

module.exports.getCategories = async (req, res) => {
    try {
        // Query the categories from the database
        const categories = await CategoryModel.find();

        console.log(categories)

        // Query the offers from the database
        const offers = await offerService.findAllOffer();
        console.log(offers)

        // Calculate the offer counts for each category
        const categoryCounts = {};

        offers.forEach((offer) => {
            const categoryName = offer.category; // Assuming you have a 'category' field in your offer schema
            if (!categoryCounts[categoryName]) {
                categoryCounts[categoryName] = 0;
            }
            categoryCounts[categoryName]++;
        });

        // Create a response object that includes both category data and offer counts
        const response = categories.map((category) => ({
            category: category.name, // Assuming you have a 'categoryName' field in your category schema
            count: categoryCounts[category.name] || 0, // Default to 0 if no offers for the category
        }));

        // Send the response to the frontend
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports.getCategoryAllEvents = async (req, res) => {
    let categoryDisplayName = req.params.categoryname
    console.log(categoryDisplayName)




    try {
        let events;
        if (categoryDisplayName != "events") {
            events = await eventService.findAllEvents({ category: categoryDisplayName })
        } else {
            events = await eventService.findAllEvents()
        }

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: events
        })


    } catch (error) {
        console.log(error)
    }



}