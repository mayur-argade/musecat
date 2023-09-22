const offerService = require("../services/offer-service");
const eventService = require('../services/event-service');
const statusCode = require("../data/statusCode");
const CategoryModel = require('../models/CategoryModel')
const categoryService = require('../services/category-service')
const cloudinary = require('cloudinary')
const Offer = require("../models/OfferModel")
const Event = require("../models/EventModel")
const moment = require('moment')

exports.createCategory = async (req, res) => {
    const { photo, name } = req.body

    if (!photo || !name) {
        return res.status(401).json({
            success: false,
            data: "All fields are required"
        })
    }
    const url = name.replace(/\s+/g, "").toLowerCase();

    try {
        let uploadedCategoryPhoto = ''
        if (photo) {
            uploadedCategoryPhoto = await cloudinary.v2.uploader.upload(photo, {
                folder: "muscat/category",
            })
        }

        let categoryData = {
            name: name,
            photo: uploadedCategoryPhoto.secure_url,
            categoryURL: url
        }

        const category = await categoryService.createCategories(categoryData)
        return res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        console.log(error)
    }

}

exports.getCategoriesWithEvents = async (req, res) => {

    const date = req.query.date

    // Convert the input date to a moment object

    const dateMoment = moment.utc(date, "YYYY-MM-DD")

    console.log(dateMoment)
    // Get the epoch timestamp in milliseconds
    const epochTimestamp = dateMoment.valueOf();
    console.log(epochTimestamp)

    try {
        // console.log(filterDate)
        const categories = await categoryService.findAllCategory();

        const categoryCounts = [];

        for (const category of categories) {
            const categoryCount = {
                // categoryId: category._id,
                categoryName: category.name,
                categoryURL: category.categoryURL,
                photo: category.photo,
                validOfferCount: 0,
            };

            const query = {
                _id: { $in: category.events }, // Filter by offer IDs in the category
            };

            if (epochTimestamp) {
                query.date = {
                    $eq: epochTimestamp,
                }; // Filter for expiry dates greater than or equal to the specified date
            }

            const validOfferCount = await Event.countDocuments(query);

            categoryCount.validOfferCount = validOfferCount;

            categoryCounts.push(categoryCount);
        }


        const filteredCategoryCounts = categoryCounts.filter((categoryCount) => categoryCount.validOfferCount >= 1);

        return res.status(200).json({
            success: true,
            data: filteredCategoryCounts
        })

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.findAllCategory()
        return res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error) {
        console.log(error)
    }
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

    const today = new Date
    const convertedString = moment(today).format("YYYY-MM-DD");
    const todayepoch = moment(convertedString)

    // Get the epoch timestamp in milliseconds
    const todaysEpochTimestamp = todayepoch.valueOf();
    // console.log(todaysEpochTimestamp)
    try {
        let events;
        if (categoryDisplayName != "events") {
            const query = {
                category: categoryDisplayName // Filter by offer IDs in the category
            };

            query.date = {
                $gte: todaysEpochTimestamp,
            };

            events = await eventService.findAllEvents(query)

        } else {
            events = await eventService.findAllEvents({ date: { $gte: todaysEpochTimestamp } })
        }

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: events
        })

    } catch (error) {
        console.log(error)
    }



}

