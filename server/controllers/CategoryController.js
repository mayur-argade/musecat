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
    const date = req.query.date

    try {
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
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: filterDate },
                                        'date.recurring.endDate': { $gte: filterDate },
                                        'date.recurring.days': { $in: [currentDay] }
                                    },
                                    {
                                        'date.recurring.startDate': { $lte: filterDate },
                                        'date.recurring.endDate': { $gte: null },
                                        'date.recurring.days': { $in: [currentDay] }
                                    }
                                ]
                            },
                        ]
                    },
                ];
            } else {
                // Calculate today's date and time
                const todayDate = new Date();
                const day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
                query['$or'] =
                    [
                        {
                            'date.dateRange.startDate': { $lte: todayDate },
                            'date.dateRange.endDate': { $gte: todayDate }
                        }
                        ,
                        {
                            $and: [
                                {
                                    $or: [
                                        {
                                            'date.recurring.startDate': { $lte: todayDate },
                                            'date.recurring.endDate': { $gte: todayDate },
                                            'date.recurring.days': { $in: day }
                                        },
                                        {
                                            'date.recurring.startDate': { $lte: todayDate },
                                            'date.recurring.endDate': { $gte: null },
                                            'date.recurring.days': { $in: day }
                                        }
                                    ]
                                },
                            ]
                        },
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
        return res.status(500).json({
            success: false,
            data: "INTERNAL SERVER ERROR"
        })
    }
}


exports.getCategoryAllEvents = async (req, res) => {
    // taking parameters like categoryname, searchquery, date
    let categoryDisplayName = req.params.categoryname
    const search = req.query.search
    console.log(search)
    const querydate = req.query.filterdate
    const today = new Date()
    const currentDay = moment().format('dddd').toLowerCase()
    console.log("querydate --> ", req.query.filterdate)
    try {
        let events;
        if (categoryDisplayName != "events") {
            let query

            if (querydate != undefined || querydate != null || querydate == '') {
                const filterdate = new Date(querydate)
                console.log("filterdate--> ", filterdate)
                const filterday = moment(filterdate).format("dddd").toLowerCase()
                query = {
                    // type: 'event',
                    verified: true,
                    $or: [
                        {
                            'date.dateRange.startDate': { $lte: filterdate },
                            'date.dateRange.endDate': { $gte: filterdate }
                        }
                        ,
                        {
                            $and: [
                                {
                                    $or: [
                                        {
                                            'date.recurring.startDate': { $lte: filterdate },
                                            'date.recurring.endDate': { $gte: filterdate },
                                            'date.recurring.days': { $in: [filterday] }
                                        },
                                        {
                                            'date.recurring.startDate': { $lte: filterdate },
                                            'date.recurring.endDate': { $gte: null },
                                            'date.recurring.days': { $in: [filterday] }
                                        }
                                    ]
                                },
                            ]
                        },
                    ],
                }
            }
            else {
                const day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
                query = {
                    // type: 'event',
                    verified: true,
                    $or: [
                        {
                            'date.dateRange.endDate': { $gte: today }
                        }
                        ,
                        {
                            $and: [
                                {
                                    $or: [
                                        {
                                            'date.recurring.endDate': { $gte: today },
                                            'date.recurring.days': { $in: day } // Replace with a function to get today's day

                                        },
                                        {
                                            'date.recurring.endDate': { $gte: null },
                                            'date.recurring.days': { $in: day } // Replace with a function to get today's day
                                        }
                                    ]
                                },
                            ]
                        },
                    ],
                }
            }

            let categoriesWithEvents = await CategoryModel.find({ categoryURL: categoryDisplayName }).populate({
                path: 'events',
                populate: {
                    path: 'location',
                },
                match: query,
            })

            events = categoriesWithEvents.reduce((acc, category) => {
                acc.push(...category.events);
                return acc;
            }, [])

        } else {
            const today = new Date();
            const day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

            let query = {
                verified: true,
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: today }
                    },
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.endDate': { $gte: today },
                                        'date.recurring.days': { $in: day }
                                    },
                                    {
                                        'date.recurring.endDate': { $gte: null },
                                        'date.recurring.days': { $in: day }
                                    }
                                ]
                            },
                        ]
                    },
                ],
            };

            console.log("query before search block", query)
            console.log("this is search --> ", search)
            if (search == undefined || search == 'undefined' || search == null) {
                console.log("did noting")
            } else {
                query.$and = query.$and || [];

                // Fuzzy search with case-insensitivity
                const fuzzySearchPattern = search.split('').join('.*?');
                const regex = new RegExp(fuzzySearchPattern, 'i');

                // Add search conditions for category name, description, and title
                query.$and.push({
                    $or: [
                        { 'description': regex },
                        { 'title': regex }
                    ]
                });
            }

            console.log("query after if block", query);
            events = await eventService.findAllEvents(query);
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

