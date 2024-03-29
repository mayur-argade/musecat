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

        const eventsWithCategory = await eventService.findAllEvents({ 'eventCategory.categoryURL': category.categoryURL })

        console.log(eventsWithCategory)

        for (const event of eventsWithCategory) {
            event.eventCategory = event.eventCategory.filter((cat) => cat.categoryURL !== category.categoryURL);

            if (event.eventCategory.length > 0) {
                await event.save();
            } else {
                event.archived = true;
                await event.save()
            }
        }

        const eventsWithCategory1 = await eventService.findAllEvents({ 'eventCategory.categoryURL': category.categoryURL })

        const deletedCategory = await categoryService.deleteCategory({ _id: categoryId })

        if (deletedCategory.value != null) {
            return res.status(500).json({
                success: false,
                data: "Category unable to delete"
            })
        }

        return res.status(200).json({
            success: true,
            data: "Category Deleted Successfully"
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

        console.log(categories)

        const categoryCounts = [];



        for (const category of categories) {
            const categoryCount = {
                categoryId: category._id,
                categoryName: category.name,
                categoryURL: category.categoryURL,
                photo: category.photo,
                validOfferCount: 0,
            };

            let query = {
                _id: { $in: category.events },
                verified: true,
                archived: false
            };

            if (date) {
                const filterDate = new Date(`${date}T23:00:00.000Z`)
                const filterDate2 = new Date(`${date}T00:00:00.000Z`)
                // const filterDate = new Date(date);
                const currentDay = moment(filterDate).format('dddd').toLowerCase()
                query['$or'] = [
                    {
                        'date.dateRange.startDate': { $lte: filterDate },
                        'date.dateRange.endDate': { $gte: filterDate2 }
                    },
                    {
                        'date.dateRange.startDate': { $lte: filterDate },
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: filterDate },
                                        'date.recurring.endDate': { $gte: filterDate2 },
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
                const filterDate = moment().format("YYYY-MM-DD")
                const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
                // const todayDate = new Date();
                const day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
                query['$or'] =
                    [
                        {
                            'date.dateRange.endDate': { $gte: todayDate }
                        },
                        {
                            'date.dateRange.endDate': null
                        }
                        ,
                        {
                            $and: [
                                {
                                    $or: [
                                        {
                                            'date.recurring.endDate': { $gte: todayDate },
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
    const { category, filterdate, subCategory, offerDay } = req.body


    let events;
    let query;
    try {

        if (filterdate != null || filterdate != undefined) {
            const timestampFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
            const filterDate = new Date(`${filterdate}T23:00:00.000Z`)
            const filterDate2 = new Date(`${filterdate}T00:00:00.000Z`)
            const currentDay = moment(filterDate).format('dddd').toLowerCase()

            query = {
                archived: false,
                verified: true,
                $or: [
                    {
                        'date.dateRange.startDate': { $lte: filterDate2 },
                        'date.dateRange.endDate': { $gte: filterDate }
                    },
                    {
                        'date.dateRange.startDate': { $lte: filterDate },
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: filterDate2 },
                                        'date.recurring.endDate': { $gte: filterDate },
                                        'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                    },
                                    {
                                        'date.recurring.startDate': { $lte: filterDate2 },
                                        'date.recurring.endDate': { $gte: null },
                                        'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                    }
                                ]
                            },
                        ]
                    },
                ],
            }
        }
        else {
            const filterDate = moment().format("YYYY-MM-DD")
            const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
            const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

            query = {
                archived: false,
                verified: true,
                type: 'event',
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.endDate': { $gte: todayDate },
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
        let categoriesWithEvents = await CategoryModel.find({ categoryURL: category }).populate({
            path: 'events',
            populate: {
                path: 'location',
            },
            match: query,
        })

        // console.log("all event catgories", categoriesWithEvents)

        events = categoriesWithEvents.reduce((acc, category) => {
            acc.push(...category.events);
            return acc;
        }, [])

        if (subCategory) {
            events = events.filter(event =>
                event.eventCategory.some(category => category.name === subCategory)
            );
        }

        if (offerDay) {
            events = events.filter(event =>
                event.date && event.date.recurring && event.date.recurring.days.includes(offerDay.toLowerCase())
            );
        }


        if (events.length <= 0) {
            const filterDate = moment().format("YYYY-MM-DD")
            const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
            const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

            
            query = {
                archived: false,
                verified: true,
                type: 'event',
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.endDate': { $gte: todayDate },
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

