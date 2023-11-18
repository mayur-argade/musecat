const offerService = require("../services/offer-service");
const eventService = require('../services/event-service');
const statusCode = require("../data/statusCode");
const CategoryModel = require('../models/CategoryModel')
const categoryService = require('../services/category-service')
const cloudinary = require('cloudinary')
const Offer = require("../models/OfferModel")
const Event = require("../models/EventModel")
const moment = require('moment')

//  Create Category
exports.createCategory = async (req, res) => {
    const { photo, name, subCategories } = req.body

    if (!photo || !name) {
        return res.status(401).json({
            success: false,
            data: "All fields are required"
        })
    }

    const subCategoriesArray = []

    if (subCategories.length > 0) {
        for (let i = 0; i < subCategories.length; i++) {

            let subUrl = subCategories[i].replace(/\s+/g, "").toLowerCase();
            console.log(subUrl)
            const data = {
                name: subCategories[i],
                categoryURL: subUrl
            }

            subCategoriesArray.push(data)
        }
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
            categoryURL: url,
            subCategories: subCategoriesArray
        }

        const category = await categoryService.createCategories(categoryData)

        return res.status(200).json({
            success: true,
            data: category
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }

}

// Update Category
exports.updateCategory = async (req, res) => {
    const { categoryId, name, subCategories } = req.body
    try {
        const category = await categoryService.findCategory({ _id: categoryId })

        if (!category) {
            return res.status(404).json({
                success: false,
                data: "Category Not Found"
            })
        }

        const subCategoriesArray = []

        if (subCategories && subCategories.length > 0) {
            for (let i = 0; i < subCategories.length; i++) {

                let subUrl = subCategories[i].replace(/\s+/g, "").toLowerCase();
                console.log(subUrl)
                const data = {
                    name: subCategories[i],
                    categoryURL: subUrl
                }

                subCategoriesArray.push(data)
            }
        }
        const categoryData = {
            _id: category._id,
            name: name,
            subCategories: subCategoriesArray
        }

        await categoryService.updateCategory(categoryData)

        return res.status(200).json({
            success: true,
            data: "Category Updated"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server error"
        })
    }


}

// delete Category
exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.body

    // console.log(req.body)

    try {

        const category = await categoryService.findCategory({ _id: categoryId })

        if (!category) {
            return res.status(404).json({
                success: false,
                data: "Category Not Found"
            })
        }

        const deletedCategory = await categoryService.deleteCategory({ _id: categoryId })

        if (deletedCategory.value != null) {
            return res.status(500).json({
                success: false,
                data: "Category unable to delete"
            })
        }

        return res.status(200).json({
            success: true,
            data: "Category Deleted successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server error"
        })
    }

}

// get All Categories
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

// Get Event Count for each category
exports.getCategoriesWithEvents = async (req, res) => {


    // const date = req.query.date;

    // try {
    //     const filterDate = date ? new Date(date) : new Date();

    //     const pipeline = [
    //         {
    //             $unwind: "$events"
    //         },
    //         {
    //             $lookup: {
    //                 from: "Events",
    //                 localField: "events",
    //                 foreignField: "_id",
    //                 as: "eventDetails"
    //             }
    //         },
    //         {
    //             $project: {
    //                 events: 1,
    //                 eventDetails: 1
    //             }
    //         }
    //         // {
    //         //     $unwind: "$eventDetails"
    //         // },
    //         // {
    //         //     $match: {
    //         //         $or: [
    //         //             {
    //         //                 'eventDetails.date.dateRange.startDate': { $lte: filterDate },
    //         //                 'eventDetails.date.dateRange.endDate': { $gte: filterDate }
    //         //             },
    //         //             {
    //         //                 'eventDetails.date.recurring.days': { $in: [moment(filterDate).format('dddd').toLowerCase()] }
    //         //             },
    //         //             {
    //         //                 'eventDetails.date.dateRange.endDate': { $gte: filterDate }
    //         //             },
    //         //             {
    //         //                 'eventDetails.date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
    //         //             }
    //         //         ]
    //         //     }
    //         // },
    //         // {
    //         //     $group: {
    //         //         _id: {
    //         //             _id: "$_id",
    //         //             categoryName: "$name",
    //         //             categoryURL: "$categoryURL",
    //         //             photo: "$photo"
    //         //         },
    //         //         validOfferCount: { $sum: 1 }
    //         //     }
    //         // },
    //         // {
    //         //     $match: {
    //         //         validOfferCount: { $gte: 1 }
    //         //     }
    //         // },
    //         // {
    //         //     $project: {
    //         //         _id: 0,
    //         //         categoryName: "$_id.name",
    //         //         categoryURL: "$_id.categoryURL",
    //         //         photo: "$_id.photo",
    //         //         validOfferCount: 1
    //         //     }
    //         // }
    //     ];

    //     const result = await CategoryModel.aggregate(pipeline);

    //     return res.status(200).json({
    //         success: true,
    //         data: result
    //     });
    // } catch (error) {
    //     console.error('Error:', error);
    //     throw error;
    // }


    const date = req.query.date

    // Convert the input date to a moment object
    const dateMoment = new Date(date)

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

            let query = {
                _id: { $in: category.events },
                verified: true // Filter by offer IDs in the category
            };

            if (date) {
                const filterDate = new Date(date);
                const currentDay = moment(filterDate).format('dddd').toLowerCase()
                query['$or'] = [
                    {
                        'date.dateRange.startDate': { $lte: filterDate },
                        'date.dateRange.endDate': { $gte: filterDate }
                    }
                    ,
                    {
                        'date.recurring': { $in: [currentDay] } // Replace with a function to get today's day
                    },
                ];
            } else {
                // Calculate today's date and time
                const todayDate = new Date();
                const day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
                query['$or'] = [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    }
                    ,
                    {
                        'date.recurring': { $in: day } // Replace with a function to get today's day
                    }
                ];
            }


            const validOfferCount = await Event.countDocuments(query);
            // console.log(query)

            categoryCount.validOfferCount = validOfferCount;

            categoryCounts.push(categoryCount);
        }


        const filteredCategoryCounts = categoryCounts.filter((categoryCount) => categoryCount.validOfferCount >= 1);

        return res.status(200).json({
            success: true,
            data: filteredCategoryCounts
        })
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


exports.getCategoryAllEvents = async (req, res) => {
    let categoryDisplayName = req.params.categoryname
    const search = req.query.search
    const categories = await categoryService.findAllCategory()
    let categoryArray = [];
    for (const category of categories) {
        categoryArray.push(category.categoryURL)
    }
    console.log(categoryDisplayName)
    console.log(categoryArray)
    try {
        let events;
        if (categoryDisplayName != "events") {
            const today = new Date()
            // const today = moment().utc()
            console.log(today)
            const currentDay = moment().format('dddd').toLowerCase()
            console.log(currentDay)
            // const currentDay = "sunday"
            let query = {
                // type: 'event',
                // verified: true,
                eventCategory: categoryDisplayName,
                $or: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.endDate': { $gte: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
                    },
                ],
            }

            events = await eventService.findAllEvents(query)
        } else {
            const today = new Date()
            // const today = moment().utc()
            console.log(today)
            const currentDay = moment().format('dddd').toLowerCase()
            console.log(currentDay)

            // const currentDay = "sunday"
            const query = {
                // type: 'event',
                // verified: true,
                $or: [
                    { // Events with start date greater than or equal to today
                        'date.dateRange.endDate': { $gte: today }
                    },
                    { // Events with recurring field containing today's day
                        'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
                    },
                ],

            }
            console.log("search before if block", search)
            console.log("query before if block", query)
            if (search == undefined || search == 'undefined') {
                console.log("what")
            } else {
                // Add search conditions for category name, description, and title
                console.log("search inside if block", search)
                query.$and.push(
                    // Case-insensitive search
                    { 'description': new RegExp(search, 'i') },
                    { 'title': new RegExp(search, 'i') }
                );
            }

            console.log("query after if block", query)
            events = await eventService.findAllEvents(query)
        }

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: events
        })
    }
    catch (error) {
        console.log(error)
    }
}

