const offerService = require("../services/offer-service");
const eventService = require('../services/event-service');
const statusCode = require("../data/statusCode");
const CategoryModel = require('../models/CategoryModel')
const categoryService = require('../services/category-service')
const cloudinary = require('cloudinary')
const Offer = require("../models/OfferModel")
const moment = require('moment');
const EventModel = require("../models/EventModel");

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
            // console.log(subUrl)
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

        const categoryCount = await categoryService.countCategory()
        const indexNumber = categoryCount + 1;

        // console.log("categoryCount", categoryCount)
        // console.log("indexNumber", indexNumber)

        let categoryData = {
            name: name,
            photo: uploadedCategoryPhoto.secure_url,
            categoryURL: url,
            subCategories: subCategoriesArray,
            index: indexNumber
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
    const { categoryId, name, subCategories, photo } = req.body
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
                // console.log(subUrl)
                const data = {
                    name: subCategories[i],
                    categoryURL: subUrl
                }

                subCategoriesArray.push(data)
            }
        }
        let categoryData = {
            _id: category._id,
            name: name,
            subCategories: subCategoriesArray
        }

        let uploadedCategoryPhoto = ''
        if (photo) {
            uploadedCategoryPhoto = await cloudinary.v2.uploader.upload(photo, {
                folder: "muscat/category",
            })
            categoryData.photo = uploadedCategoryPhoto.secure_url
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

        // console.log(eventsWithCategory)

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
// exports.getCategoriesWithEvents = async (req, res) => {
//     const date = req.query.date


//     try {
//         const categories = await categoryService.findAllCategory();

//         console.log(categories)

//         const categoryCounts = [];



//         for (const category of categories) {
//             const categoryCount = {
//                 categoryId: category._id,
//                 categoryName: category.name,
//                 categoryURL: category.categoryURL,
//                 photo: category.photo,
//                 validOfferCount: 0,
//             };

//             let query = {
//                 _id: { $in: category.events },
//                 verified: true,
//                 archived: false
//             };

//             if (date) {
//                 const filterDate = new Date(`${date}T23:00:00.000Z`)
//                 const filterDate2 = new Date(`${date}T00:00:00.000Z`)
//                 // const filterDate = new Date(date);
//                 const currentDay = moment(filterDate).format('dddd').toLowerCase()
//                 query['$or'] = [
//                     {
//                         'date.dateRange.startDate': { $lte: filterDate },
//                         'date.dateRange.endDate': { $gte: filterDate2 }
//                     },
//                     {
//                         'date.dateRange.startDate': { $lte: filterDate },
//                         'date.dateRange.endDate': null
//                     }
//                     ,
//                     {
//                         $and: [
//                             {
//                                 $or: [
//                                     {
//                                         'date.recurring.startDate': { $lte: filterDate },
//                                         'date.recurring.endDate': { $gte: filterDate2 },
//                                         'date.recurring.days': { $in: [currentDay] }
//                                     },
//                                     {
//                                         'date.recurring.startDate': { $lte: filterDate },
//                                         'date.recurring.endDate': { $gte: null },
//                                         'date.recurring.days': { $in: [currentDay] }
//                                     }
//                                 ]
//                             },
//                         ]
//                     },
//                 ];
//             } else {
//                 const filterDate = moment().format("YYYY-MM-DD")
//                 const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
//                 // const todayDate = new Date();
//                 const day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
//                 query['$or'] =
//                     [
//                         {
//                             'date.dateRange.endDate': { $gte: todayDate }
//                         },
//                         {
//                             'date.dateRange.endDate': null
//                         }
//                         ,
//                         {
//                             $and: [
//                                 {
//                                     $or: [
//                                         {
//                                             'date.recurring.endDate': { $gte: todayDate },
//                                             'date.recurring.days': { $in: day } // Replace with a function to get today's day

//                                         },
//                                         {
//                                             'date.recurring.endDate': { $gte: null },
//                                             'date.recurring.days': { $in: day } // Replace with a function to get today's day
//                                         }
//                                     ]
//                                 },
//                             ]
//                         },
//                     ];
//             }


//             const validOfferCount = await Event.countDocuments(query);
//             // console.log(query)

//             categoryCount.validOfferCount = validOfferCount;

//             categoryCounts.push(categoryCount);
//         }


//         const filteredCategoryCounts = categoryCounts.filter((categoryCount) => categoryCount.validOfferCount >= 1);

//         return res.status(200).json({
//             success: true,
//             data: filteredCategoryCounts
//         })
//     }
//     catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({
//             success: false,
//             data: "INTERNAL SERVER ERROR"
//         })
//     }
// }

exports.getCategoriesWithEvents = async (req, res) => {
    const array =
        [
            {
                name: 'Friday Brunch',
                categoryURLSync: 'fridaybrunch',
                categoryURL: 'eat&drink?subcategory=Friday%20Brunch',
                img: 'https://res.cloudinary.com/mayurs-media/image/upload/v1715124639/muscat/category/fridayBrunch_k3b1xn.jpg',
            },
            {
                name: 'Afternoon Tea',
                categoryURLSync: "afternoontea",
                categoryURL: 'eat&drink?subcategory=Afternoon%20Tea',
                img: 'https://res.cloudinary.com/mayurs-media/image/upload/v1715124764/muscat/category/Afternoon_tea_zyw821.jpg',
            },
            {
                name: 'Thursday Dinner',
                categoryURLSync: "thursdaydinner",
                categoryURL: 'eat&drink?subcategory=Dinner&day=Thursday',
                img: 'https://res.cloudinary.com/mayurs-media/image/upload/v1715124815/muscat/category/thursday_dinner_ptwzno.jpg',
            },
            {
                name: 'Happy Hour',
                categoryURLSync: "happyhour",
                categoryURL: 'eat&drink?subcategory=Happy%20Hour',
                img: 'https://res.cloudinary.com/mayurs-media/image/upload/v1715124862/muscat/category/happy_hour_fifylg.jpg',
            },
            {
                name: 'Pool & Beach',
                categoryURLSync: "poolandbeach",
                categoryURL: 'poolandbeach',
                img: 'https://res.cloudinary.com/mayurs-media/image/upload/v1713216207/muscat/category/k476k5iyxhq7jko6sjda.jpg',
            },
            {
                name: 'Kids Corner',
                categoryURLSync: "kidscorner",
                categoryURL: 'kidscorner',
                img: 'https://res.cloudinary.com/mayurs-media/image/upload/v1713216228/muscat/category/lz8bd3vgcjqezkdzok6y.jpg',
            }
        ]


    // ['fridaybrunch', "Ladies Night", "Afternoon Tea", "Thursday Dinner", "Happy Hour", "Pool & Beach", "Kids Corner"];
    const filterDate = moment().format("YYYY-MM-DD");
    const todayDate = new Date(`${filterDate}T00:00:00.000Z`);
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Create an array of objects to store count and image URL for each event
    const eventDetails = [];

    try {
        for (const eventName of array) {
            let query = {
                archived: false,
                verified: true,
                type: 'event',
                eventCategory: { $elemMatch: { categoryURL: eventName.categoryURLSync.toLowerCase().replace(/\s/g, '-') } }, // Adjust categoryURL format
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

            const count = await EventModel.countDocuments(query);
            // const imageUrl = await EventModel.findOne(query).select('imageUrl');
            let nam = eventName.name
            let image = eventName.img
            let url = eventName.categoryURL
            eventDetails.push({
                categoryId: url,
                categoryName: nam,
                categoryURL: url,
                photo: image,
                validOfferCount: count,

            });
        }

        // console.log(eventDetails); // Output the count and image URL for each event

        const filteredEvents = eventDetails.filter(event => event.validOfferCount > 0);
        return res.status(200).json({
            success: true,
            data: filteredEvents
        })

    } catch (error) {
        console.error(error);
    }
}

exports.getCategoryAllEvents = async (req, res) => {
    // taking parameters like categoryname, searchquery, date
    const { search, category, filterdate, subCategory, offerDay } = req.body
    // console.log(req.body)


    let events;
    let query;
    try {
        if (search) {

        }

        if (filterdate != null || filterdate != undefined) {
            const onlyDate = moment(filterdate).format("YYYY-MM-DD")
            const startDate = new Date(`${onlyDate}T00:00:00.000Z`)
            const endDate = new Date(`${onlyDate}T23:00:00.000Z`)
            const currentDay = moment(startDate).format('dddd').toLowerCase()

            // console.log(startDate)
            // console.log(endDate)
            query = {
                archived: false,
                verified: true,
                type: 'event',
                $or: [
                    {
                        'date.dateRange.startDate': { $lte: startDate },
                        'date.dateRange.endDate': { $gte: endDate }
                    },
                    {
                        'date.dateRange.startDate': { $lte: startDate },
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: startDate },
                                        'date.recurring.endDate': { $gte: endDate },
                                        'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                    },
                                    {
                                        'date.recurring.startDate': { $lte: startDate },
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
            // console.log(todayDate)
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

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: events
        })
    }
    catch (error) {
        console.log(error)
    }
}

exports.getCategoryAllEvents2 = async (req, res) => {
    try {
        const { category, filterdate, query: keyword, subCategory, offerDay } = req.body;

        let query;
        let events;
        // if (category != 'events') {
        let categoriesWithEvents;
        if (keyword) {
            console.log("This code is running");

            // Get today's date
            const filterDate = moment().format("YYYY-MM-DD");
            const todayDate = new Date(`${filterDate}T00:00:00.000Z`);

            // Define days of the week for recurring events
            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            // Constructing a query for fuzzy search with MongoDB's text index
            const query = {
                archived: false,
                verified: true,
                type: 'event',
                $and: [
                    {
                        $or: [
                            { 'date.dateRange.endDate': { $gte: todayDate } },
                            { 'date.dateRange.endDate': null },
                            {
                                $and: [
                                    {
                                        $or: [
                                            {
                                                'date.recurring.endDate': { $gte: todayDate },
                                                'date.recurring.days': { $in: daysOfWeek }
                                            },
                                            {
                                                'date.recurring.endDate': null,
                                                'date.recurring.days': { $in: daysOfWeek }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    // Search in title or description
                    {
                        $or: [
                            { 'title': { $regex: keyword, $options: 'i' } }, // Case-insensitive regex
                            { 'description': { $regex: keyword, $options: 'i' } }
                        ]
                    }
                ]
            };

            // Fetch events matching the query
            events = await EventModel.find(query).populate({ path: 'location' });
            // return events;
        }


        else {
            if (filterdate) {
                const onlyDate = moment(filterdate).format("YYYY-MM-DD")
                const startDate = new Date(`${onlyDate}T00:00:00.000Z`)
                const endDate = new Date(`${onlyDate}T00:00:00.000Z`)
                const specEnd = new Date(`${onlyDate}T23:59:00.000Z`)
                const currentDay = moment(startDate).format('dddd').toLowerCase()

                // console.log(startDate)
                // console.log(endDate)
                query = {
                    archived: false,
                    verified: true,
                    type: 'event',
                    $or: [
                        {
                            'date.dateRange.startDate': { $lte: startDate },
                            'date.dateRange.endDate': { $gte: endDate }
                        },
                        {
                            'date.dateRange.startDate': { $lte: specEnd },
                            // 'date.dateRange.startDate': { $lte: specEnd },
                            'date.dateRange.endDate': { $gte: startDate },
                            // 'date.dateRange.endDate': { $gte: specEnd }
                        },
                        {
                            'date.dateRange.startDate': { $lte: startDate },
                            'date.dateRange.endDate': null
                        }
                        ,
                        {
                            $and: [
                                {
                                    $or: [
                                        {
                                            'date.recurring.startDate': { $lte: startDate },
                                            'date.recurring.endDate': { $gte: endDate },
                                            'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                        },
                                        {
                                            'date.recurring.startDate': { $lte: startDate },
                                            'date.recurring.endDate': { $gte: null },
                                            'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                        }
                                    ]
                                },
                            ]
                        },
                    ],
                }
            } else {
                const filterDate = moment().format("YYYY-MM-DD")
                const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
                // console.log(todayDate)
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


            categoriesWithEvents = await CategoryModel.find({ categoryURL: category }).populate({
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
        }

        console.log(categoriesWithEvents)



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

        // }
        // else {
        //     if (filterdate) {
        //         const onlyDate = moment(filterdate).format("YYYY-MM-DD")
        //         const startDate = new Date(`${onlyDate}T00:00:00.000Z`)
        //         const endDate = new Date(`${onlyDate}T00:00:00.000Z`)
        //         const currentDay = moment(startDate).format('dddd').toLowerCase()

        //         console.log(startDate)
        //         console.log(endDate)
        //         query = {
        //             archived: false,
        //             verified: true,
        //             type: 'event',
        //             $or: [
        //                 {
        //                     'date.dateRange.startDate': { $lte: startDate },
        //                     'date.dateRange.endDate': { $gte: endDate }
        //                 },
        //                 {
        //                     'date.dateRange.startDate': { $lte: startDate },
        //                     'date.dateRange.endDate': null
        //                 }
        //                 ,
        //                 {
        //                     $and: [
        //                         {
        //                             $or: [
        //                                 {
        //                                     'date.recurring.startDate': { $lte: startDate },
        //                                     'date.recurring.endDate': { $gte: endDate },
        //                                     'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
        //                                 },
        //                                 {
        //                                     'date.recurring.startDate': { $lte: startDate },
        //                                     'date.recurring.endDate': { $gte: null },
        //                                     'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
        //                                 }
        //                             ]
        //                         },
        //                     ]
        //                 },
        //             ],
        //         }
        //     } else {
        //         const filterDate = moment().format("YYYY-MM-DD")
        //         const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
        //         const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        //         query = {
        //             archived: false,
        //             verified: true,
        //             type: 'event',
        //             $or: [
        //                 {
        //                     'date.dateRange.endDate': { $gte: todayDate }
        //                 },
        //                 {
        //                     'date.dateRange.endDate': null
        //                 }
        //                 ,
        //                 {
        //                     $and: [
        //                         {
        //                             $or: [
        //                                 {
        //                                     'date.recurring.endDate': { $gte: todayDate },
        //                                     'date.recurring.days': { $in: day } // Replace with a function to get today's day

        //                                 },
        //                                 {
        //                                     'date.recurring.endDate': { $gte: null },
        //                                     'date.recurring.days': { $in: day } // Replace with a function to get today's day
        //                                 }
        //                             ]
        //                         },
        //                     ]
        //                 },
        //             ],
        //         }
        //     }
        //     if (keyword == undefined || keyword == 'undefined' || keyword == null) {
        //         // console.log("did noting")
        //     } else {
        //         query.$and = query.$and || [];

        //         // Fuzzy search with case-insensitivity
        //         const fuzzySearchPattern = keyword.split('').join('.*?');
        //         const regex = new RegExp(fuzzySearchPattern, 'i');

        //         // Add search conditions for category name, description, and title
        //         query.$and.push({
        //             $or: [
        //                 { 'description': regex },
        //                 { 'title': regex }
        //             ]
        //         });
        //     }

        //     events = await eventService.findAllEvents(query);
        // }

        res.status(200).json({
            success: true,
            data: events
        })

    } catch (error) {
        console.log(error)
    }
}

