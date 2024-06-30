const statusCode = require('../data/statusCode')
const cloudinary = require('cloudinary')
const eventService = require('../services/event-service')
const offerService = require('../services/offer-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const categoryService = require('../services/category-service')
const CategoryModel = require('../models/CategoryModel')
const moment = require('moment-timezone')
const EventModel = require('../models/EventModel')
const ics = require('ics')
const { writeFileSync } = require('fs');
const { transporter } = require('../services/mail-service')
const vendorService = require('../services/vendor-service')
const VendorModel = require('../models/VendorModel')
const notificationService = require('../services/notification-service')
// vendor side
exports.createEvent = async (req, res) => {
    let { showStartDate, showInEventCalender, featuredPhoto, title, description, showEndDate, shortDescription, location, venueInfo, custom, features, termsAndConditions, categories, eventCategory, displayPhoto, banner, date, additinalImages, video, seatingMap, facebook, instagram, email, whatsapp, website, phone, discountOnApp, verified
    } = req.body;

    console.log('Request body:', req.body);

    if (!featuredPhoto || !title || !displayPhoto || !shortDescription || !description || !location || !date || !eventCategory) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "Required fields are missing"
        });
    }

    let event = {};

    try {
        let uploadedEventPhoto = '';
        if (displayPhoto) {
            try {
                uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                    folder: "muscat/events",
                    transformation: [{ format: 'webp' }]
                });
            } catch (err) {
                console.error('Error uploading display photo:', err);
                return res.status(400).json({
                    success: false,
                    data: "Failed to upload display photo"
                });
            }
        }
        let uploadedFeaturedPhoto = ''
        if (featuredPhoto) {
            try {
                uploadedFeaturedPhoto = await cloudinary.v2.uploader.upload(featuredPhoto, {
                    folder: "muscat/events",
                    transformation: [{ format: 'webp' }]
                });
            } catch (err) {
                console.error('Error uploading display photo:', err);
                return res.status(400).json({
                    success: false,
                    data: "Failed to upload display photo"
                });
            }
        }

        let uploadedSeatingMap = '';
        if (seatingMap && seatingMap !== 'null' && seatingMap !== '') {
            try {
                uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                    folder: "muscat/events",
                    transformation: [{ format: 'webp' }]
                });
            } catch (err) {
                console.error('Error uploading seating map:', err);
                return res.status(400).json({
                    success: false,
                    data: "Failed to upload seating map"
                });
            }
        }

        let uploadedBanner = '';
        if (banner && banner !== 'null' && banner !== '') {
            try {
                uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                    folder: "muscat/events",
                    transformation: [{ format: 'webp' }]
                });
            } catch (err) {
                console.error('Error uploading banner:', err);
                return res.status(400).json({
                    success: false,
                    data: "Failed to upload banner"
                });
            }
        }

        let additinalPhotos = [];
        if (additinalImages && additinalImages.length != 0) {
            try {
                for (let i = 0; i < additinalImages.length; i++) {
                    const uploadResult = await cloudinary.v2.uploader.upload(additinalImages[i], {
                        folder: "muscat/events",
                        transformation: [{ format: 'webp' }]
                    });
                    additinalPhotos.push(uploadResult.secure_url);
                }
            } catch (err) {
                console.error('Error uploading additional images:', err);
                return res.status(400).json({
                    success: false,
                    data: "Failed to upload additional images"
                });
            }
        }

        function isDinnerCategoryExists(categories) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name.toLowerCase().includes("dinner")) {
                    return true;
                }
            }
            return false;
        }

        if (date.type != 'dateRange' && date.recurring.days.length > 0 && isDinnerCategoryExists(eventCategory)) {
            const recurringDays = date.recurring.days;
            recurringDays.forEach(day => {
                eventCategory.push({
                    name: day.charAt(0).toUpperCase() + day.slice(1) + " Dinner",
                    categoryURL: day.toLowerCase() + "dinner"
                });
            });
        }

        console.log(eventCategory);

        const data = {
            title: title,
            shortDescription: shortDescription,
            description: description,
            date: date,
            location: location,
            venueInfo: venueInfo,
            eventCategory: eventCategory,
            features: features,
            whatsapp: whatsapp,
            email: email,
            facebook: facebook,
            instagram: instagram,
            phoneNo: phone,
            website: website,
            categories: categories,
            termsAndConditions: termsAndConditions,
            custom: custom,
            vendorid: req.user._id,
            verified: verified,
            displayPhoto: uploadedEventPhoto.secure_url,
            banner: uploadedBanner.secure_url,
            video: video,
            seatingMap: uploadedSeatingMap.secure_url,
            AdditionalPhotos: additinalPhotos,
            type: 'event',
            showEndDate: showEndDate,
            discountOnApp: discountOnApp,
            featuredPhoto: uploadedFeaturedPhoto.secure_url,
            showStartDate: showStartDate,
            showInEventCalender: showInEventCalender
        };

        // console.log(date);

        event = await eventService.createEvent(data);

        let categoryData;
        for (let i = 0; i < eventCategory.length; i++) {
            const categoryURL = eventCategory[i].categoryURL;

            categoryData = await categoryService.findCategory({ categoryURL: categoryURL });
            if (!categoryData) {
                categoryData = await categoryService.findSubcategory(categoryURL);
            }

            if (categoryData && !categoryData.events.includes(event._id)) {
                categoryData.events.push(event._id);
                categoryData.save();
            }
        }


        const allUserIds = await VendorModel.find({ role: 'admin' }, '_id');

        // Create notifications for each user
        const notificationPromises = allUserIds.map(async (userId) => {
            const notification = {
                senderid: req.user._id,
                receiverid: userId._id.toString(),
                msg: `New event ${title} has been added by ${req.user.firstname} and requires your verification.`
            };
            // console.log(userId)
            return await notificationService.createNotification(notification);
        });

        res.status(200).json({
            success: true,
            data: event
        });

    } catch (error) {
        console.error(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        });
    }
};


exports.updateEvent = async (req, res) => {
    let { featuredPhoto, showStartDate, showInEventCalender, eventid, title, displayPhoto, banner, video, shortDescription, description, location, custom, features, termsAndConditions,
        date, categories, eventCategory, instagram, facebook, whatsapp, email, discountOnApp, type, seatingMap, showEndDate, venueInfo, additinalImages, website, phone
    } = req.body


    let event = {}

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            // console.log(uploadedEventPhoto)
        }

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }

        let uploadedSeatingMap = '';
        if (seatingMap) {
            uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                folder: "muscat/events",
            })
        }

        let uploadResult;
        let additinalPhotos = []
        if (additinalImages && additinalImages.length != 0) {
            for (let i = 0; i < additinalImages.length; i++) {
                // console.log(additinalImages[i])
                uploadResult = await cloudinary.v2.uploader.upload(additinalImages[i], {
                    folder: "muscat/events",
                })
                additinalPhotos.push(uploadResult.secure_url)
            }
        }

        let uploadedFeaturedPhoto = ''
        if (featuredPhoto) {
            try {
                uploadedFeaturedPhoto = await cloudinary.v2.uploader.upload(featuredPhoto, {
                    folder: "muscat/events",
                    transformation: [{ format: 'webp' }]
                });
            } catch (err) {
                console.error('Error uploading display photo:', err);
                return res.status(400).json({
                    success: false,
                    data: "Failed to upload display photo"
                });
            }
        }

        const data = {
            _id: eventid,
            title: title,
            shortDescription: shortDescription,
            description: description,

            date: date,
            showEndDate: showEndDate,

            location: location,
            venueInfo: venueInfo,

            eventCategory: eventCategory,
            features: features,

            facebook: facebook,
            instagram: instagram,
            email: email,
            phoneNo: phone,
            whatsapp: whatsapp,
            website: website,


            categories: categories,
            termsAndConditions: termsAndConditions,
            custom: custom,

            displayPhoto: uploadedEventPhoto.secure_url,
            // AdditionalPhotos: additinalPhotos,
            seatingMap: uploadedSeatingMap.secure_url,
            banner: uploadedBanner.secure_url,
            video: video,
            featuredPhoto: uploadedFeaturedPhoto.secure_url,

            type: type,
            discountOnApp: discountOnApp,

            showStartDate: showStartDate,
            showInEventCalender: showInEventCalender,
        }

        // Only update additionalPhotos if new images were uploaded
        if (additionalPhotos.length > 0) {
            data.additionalPhotos = additionalPhotos;
        }


        let categoryData;
        for (let i = 0; i < eventCategory.length; i++) {
            const categoryURL = eventCategory[i].categoryURL;

            // Check in main categories
            categoryData = await categoryService.findCategory({
                categoryURL: categoryURL
            });


            event = await eventService.updateEvent(data)

            if (!categoryData) {
                // If not found in main categories, search in subcategories of all categories
                categoryData = await categoryService.findSubcategory(categoryURL);

                if (!categoryData) {
                    // If not found in subcategories either, return error
                    return res.status(404).json({
                        success: false,
                        data: "Category not found"
                    });
                }
            }

            if (!categoryData.events.includes(event._id)) {
                categoryData.events.push(event._id)
            }
            categoryData.save()
        }

        res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        })
    }

}

exports.createOffer = async (req, res) => {
    let { title, description, shortDescription, showEndDate, location, venueInfo, custom, features, termsAndConditions, categories, eventCategory, displayPhoto, banner, date, additinalImages, video, seatingMap, facebook, instagram, email, whatsapp, website, phone, discountOnApp
    } = req.body

    if (!title || !displayPhoto || !shortDescription || !description || !location || !date || !categories || !eventCategory) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "Required fields are missing"
        })
    }

    let event = {}

    try {
        let uploadedEventPhoto = ''
        if (displayPhoto) {
            uploadedEventPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/events",
            })
            // console.log(uploadedEventPhoto)
        }

        let uploadedSeatingMap = ''

        if (seatingMap) {
            uploadedSeatingMap = await cloudinary.v2.uploader.upload(seatingMap, {
                folder: "muscat/events",
            })
        }

        let uploadedBanner = ''
        if (banner) {
            uploadedBanner = await cloudinary.v2.uploader.upload(banner, {
                folder: "muscat/events",
            })
        }



        let uploadResult;
        let additinalPhotos = []
        if (additinalImages && additinalImages.length != 0) {
            for (let i = 0; i < additinalImages.length; i++) {
                // console.log(additinalImages[i])
                uploadResult = await cloudinary.v2.uploader.upload(additinalImages[i], {
                    folder: "muscat/events",
                })
                additinalPhotos.push(uploadResult.secure_url)
            }
        }


        const data = {
            title: title,
            shortDescription: shortDescription,
            description: description,
            date: date,
            location: location,
            venueInfo: venueInfo,

            eventCategory: eventCategory,
            features: features,

            whatsapp: whatsapp,
            email: email,
            facebook: facebook,
            instagram: instagram,
            phoneNo: phone,
            website: website,

            categories: categories,

            termsAndConditions: termsAndConditions,

            custom: custom,

            vendorid: req.user._id,

            displayPhoto: uploadedEventPhoto.secure_url,
            banner: uploadedBanner.secure_url,
            video: video,
            seatingMap: uploadedSeatingMap.secure_url,
            AdditionalPhotos: additinalPhotos,

            type: 'offer',

            showEndDate: showEndDate,
            discountOnApp: discountOnApp
        }

        event = await eventService.createEvent(data)

        let categoryData;
        for (let i = 0; i < eventCategory.length; i++) {
            const categoryURL = eventCategory[i].categoryURL;

            // Check in main categories
            categoryData = await categoryService.findCategory({
                categoryURL: categoryURL
            });



            if (!categoryData) {
                // If not found in main categories, search in subcategories of all categories
                categoryData = await categoryService.findSubcategory(categoryURL);

                if (!categoryData) {
                    // If not found in subcategories either, return error
                    return res.status(404).json({
                        success: false,
                        data: "Category not found"
                    });
                }
            }

            categoryData.events.push(event._id)
            categoryData.save()
        }


        res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.getEventById = async (req, res) => {
    const { eventid } = req.params

    if (!eventid) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: statusCode.BAD_REQUEST.message
        })
    }
    try {
        const event = await eventService.findEvent({ _id: eventid })
        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: statusCode.INTERNAL_SERVER_ERROR.message
        })
    }


}

exports.getAllEvents = async (req, res) => {
    try {
        const filterDate = moment().format("YYYY-MM-DD");
        const todayDate = new Date(`${filterDate}T23:00:00.000Z`);
        const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const query = {
            archived: false,
            verified: true,
            type: 'event',
            $or: [
                {
                    'date.dateRange.endDate': { $gte: todayDate }
                },
                {
                    'date.dateRange.endDate': null
                },
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
                        }
                    ]
                }
            ]
        };

        let categoriesWithEvents = await CategoryModel.find().populate({
            path: 'events',
            populate: {
                path: 'location'
            },
            match: query
        });

        const uniqueEvents = new Set();
        const events = categoriesWithEvents.reduce((acc, category) => {
            category.events.forEach(event => {
                if (!uniqueEvents.has(event._id.toString())) {
                    uniqueEvents.add(event._id.toString());
                    acc.push(event);
                }
            });
            return acc;
        }, []);

        return res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


exports.getVendorAllEventsNOffers = async (req, res) => {
    const vendor = req.user

    // console.log(vendor)
    const today = new Date()
    const currentDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


    try {
        const events = await eventService.findAllEvents({
            vendorid: vendor,
            type: 'event',
            archived: false,
            // verified: true,
            $or: [
                {
                    'date.dateRange.endDate': { $gte: today }
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
                                    // 'date.recurring.startDate': { $lte: today },
                                    'date.recurring.endDate': { $gte: today },
                                    'date.recurring.days': { $in: currentDay }
                                },
                                {
                                    // 'date.recurring.startDate': { $lte: today },
                                    'date.recurring.endDate': { $gte: null },
                                    'date.recurring.days': { $in: currentDay }
                                }
                            ]
                        },
                    ]
                },
            ],

        })

        const expiredEvent = await eventService.findAllEvents({
            vendorid: vendor,
            type: 'event',
            // verified: true,
            $or: [
                {
                    'date.dateRange.endDate': { $lt: today }
                },
                { archived: true }
                ,
                {
                    // 'date.recurring.startDate': { $lte: today },
                    'date.recurring.endDate': { $lt: today },
                },
            ],

        })

        const offers = await eventService.findAllEvents(
            {
                vendorid: vendor,
                type: 'offer',
                // verified: true,
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
                                        // 'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: today },
                                        'date.recurring.days': { $in: currentDay }
                                    },
                                    {
                                        // 'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: null },
                                        'date.recurring.days': { $in: currentDay }
                                    }
                                ]
                            },
                        ]
                    },
                ],

            }
        )

        const expiredOffers = await eventService.findAllEvents(
            {
                vendorid: vendor,
                type: 'offer',
                archived: true,
                // verified: true,
                $or: [
                    {
                        'date.dateRange.endDate': { $lt: today }
                    }
                    ,
                    {
                        // 'date.recurring.startDate': { $lte: today },
                        'date.recurring.endDate': { $lt: today },
                    },
                ],

            }
        )

        if (!events) {
            return res.status(statusCode.NOT_FOUND.code).json({
                success: false,
                data: statusCode.NOT_FOUND.message
            })
        }

        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: {
                events: events,
                expiredEvents: expiredEvent,
                offers: offers,
                expiredOffers: expiredOffers
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}

exports.vendorHome = async (req, res) => {
    const { _id } = req.user

    try {
        // const filterDate = moment().format("YYYY-MM-DD")
        // const today = new Date(`${filterDate}T23:00:00.000Z`)
        const today = new Date();

        const currentDay = moment().format('dddd').toLowerCase()

        const events = await eventService.findAllEvents(
            {
                vendorid: _id,
                type: 'event',
                verified: true,
                archived: false,
                $or: [
                    {
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': { $gte: today }
                    },
                    {
                        'date.dateRange.startDate': { $lte: today },
                        'date.dateRange.endDate': null
                    }
                    ,
                    {
                        $and: [
                            {
                                'date.recurring.days': { $in: [currentDay] }
                            },
                            {
                                $or: [
                                    {
                                        'date.recurring.startDate': { $lte: today },
                                        'date.recurring.endDate': { $gte: today }
                                    },
                                    {
                                        'date.recurring.startDate': today,
                                        'date.recurring.endDate': null
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        )

        // phase 2 of vouchers
        // const offers = await eventService.findAllEvents(
        //     {
        //         vendorid: _id, // Assuming you pass the vendor id as a route parameter
        //         type: 'offer',
        //         verified: true,
        //         archived: false,
        //         $or: [
        //             {
        //                 'date.dateRange.startDate': { $lte: today },
        //                 'date.dateRange.endDate': { $gte: today }
        //             }
        //             ,
        //             {
        //                 $and: [
        //                     {
        //                         'date.recurring.days': { $in: currentDay }
        //                     },
        //                     {
        //                         $or: [
        //                             {
        //                                 'date.recurring.startDate': { $lte: today },
        //                                 'date.recurring.endDate': { $gte: today }
        //                             },
        //                             {
        //                                 'date.recurring.startDate': null,
        //                                 'date.recurring.endDate': null
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ],
        //     }
        // )

        res.status(200).json({
            success: true,
            data: {
                ongoingEvents: events,
                ongoingOffers: []
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }

}

exports.VendorUnverifiedListings = async (req, res) => {
    const { _id } = req.user

    try {
        const today = new Date()
        const currentDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        const events = await eventService.findAllEvents(
            {
                vendorid: _id, // Assuming you pass the vendor id as a route parameter
                verified: false,
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: today }
                    }
                    ,
                    {
                        $and: [
                            {
                                'date.recurring.days': { $in: currentDay }
                            },
                            {
                                $or: [
                                    {
                                        'date.recurring.endDate': { $gte: today }
                                    },
                                    {
                                        // 'date.recurring.startDate': null,
                                        'date.recurring.endDate': null
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        )
        return res.status(200).json({
            success: true,
            data: events
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}


exports.addToFavorites = async (req, res) => {
    // console.log(req.user)
    const { _id } = req.user;
    const { eventid } = req.body

    if (_id == null || _id == undefined) {
        return res.status(401).json({
            success: false,
            data: "Try login first"
        })
    }

    // console.log(_id, eventid)
    try {
        // Find the user by ID
        let user = await userService.findUser({ _id: _id });

        // Find the event by ID
        let event = await eventService.findEvent({ _id: eventid });

        // console.log(user, event)

        if (!user || !event) {
            return res.status(404).json({ success: false, message: 'User or Event not found' });
        }

        // Check if the user's ID is in the event's 'likes' array

        const idString = _id.toString();


        if (event.likes.includes(user._id) && user.favorites.includes(event._id)) {
            // If the user's ID is in the 'likes' array, remove it
            likes = event.likes.filter(userId => userId.toString() !== idString);
            // Remove the event ID from the user's 'favorites' array if present
            favorites = user.favorites.filter(eventid => eventid.toString() !== event._id.toString());


            const eventdata = {
                _id: event._id,
                likes: likes
            }
            const updatedEvent = await eventService.updateEvent(eventdata)

            const userData = {
                _id: user._id,
                favorites: favorites
            }

            const updatedUser = await userService.updateUser(userData)

            return res.status(200).json({ success: true, message: 'Removed from favorites' });
        } else {
            // If the user's ID is not in the 'likes' array, add it
            event.likes.push(_id);
            // Add the event ID to the user's 'favorites' array if not already present
            if (!user.favorites.includes(event._id)) {
                user.favorites.push(event._id);
            }
            // Save the updated event and user data
            await event.save();
            await user.save();
            return res.status(200).json({ success: true, message: 'Added to favorites' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports.customQue = async (req, res) => {
    const eventid = req.params.eventid

    try {
        const eventQue = await eventService.findEvent({ _id: eventid })
        let data = eventQue.custom
        return res.status(200).json({
            success: true,
            data: data
        })

    } catch (error) {
        console.log(error)
    }
}

exports.changeTrendingStatus = async (req, res) => {
    const { eventid, status } = req.body
    console.log(req.body)


    try {
        let event = await eventService.findEvent({ _id: eventid })
        console.log(event)

        if (!event) {
            return res.status(404).json({
                success: false,
                data: "Event not found"
            })
        } else if (event.location.verified == false) {
            return res.status(400).json({
                succss: false,
                data: `Please Verify Venue ${event.location.name} first which is associated with this event `
            })
        }

        const updatedData = {
            _id: eventid,
            trending: status
        }

        event = await eventService.updateEvent(updatedData)

        return res.status(200).json({
            success: true,
            data: "Event updated"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.changeArchiveStatus = async (req, res) => {
    const { eventid, status } = req.body
    console.log(req.body)


    try {
        let event = await eventService.findEvent({ _id: eventid })
        console.log(event)

        if (!event) {
            return res.status(404).json({
                success: false,
                data: "Event not found"
            })
        }

        const updatedData = {
            _id: eventid,
            archived: status
        }

        event = await eventService.updateEvent(updatedData)

        return res.status(200).json({
            success: true,
            data: "Event updated"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.changeVerifyStatus = async (req, res) => {
    const { eventid, status } = req.body
    console.log(req.body)


    try {
        let event = await eventService.findEvent({ _id: eventid })
        console.log(event)

        if (!event) {
            return res.status(404).json({
                success: false,
                data: "Event not found"
            })
        } else if (event.location.verified == false) {
            return res.status(400).json({
                succss: false,
                data: `Please Verify Venue ${event.location.name} first which is associated with this event `
            })
        }

        const updatedData = {
            _id: eventid,
            verified: status
        }

        event = await eventService.updateEvent(updatedData)

        return res.status(200).json({
            success: true,
            data: "Event updated"
        })
    } catch (error) {
        console.log(error)
    }
}

// --------------------Client side ---------------
module.exports.getUpcomingEvents = async (req, res) => {
    try {
        let eventsOnDate;
        // Check if a date is provided in the request query
        const customDate = req.query.date
        console.log(customDate)
        let query = {
            verified: true,
            archived: false
        };
        if (customDate) {
            const timestampFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
            const filterDate = new Date(`${customDate}T23:00:00.000Z`)
            const filterDate2 = new Date(`${customDate}T00:00:00.000Z`)

            // // Convert the formatted date string to a JavaScript Date object
            // const filterDate = new Date(endOfDay);
            console.log(filterDate)
            const currentDay = moment(filterDate).format('dddd').toLowerCase()
            query['$or'] = [
                {
                    'date.dateRange.startDate': { $lte: filterDate },
                    'date.dateRange.endDate': { $gte: filterDate2 }
                },
                {
                    'date.dateRange.startDate': { $lte: filterDate },
                    // 'date.dateRange.startDate': { $lte: specEnd },
                    'date.dateRange.endDate': { $gte: filterDate2 },
                    // 'date.dateRange.endDate': { $gte: specEnd }
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
                                    'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                },
                                {
                                    'date.recurring.startDate': { $lte: filterDate },
                                    'date.recurring.endDate': { $gte: null },
                                    'date.recurring.days': { $in: [currentDay] } // Replace with a function to get today's day
                                }
                            ]
                        },
                    ]
                },
            ];
            eventsOnDate = await eventService.findAllEvents(query);

        } else {
            const filterDate = moment().format("YYYY-MM-DD")
            const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
            const day = moment(todayDate).format('dddd').toLowerCase()
            query['$or'] = [
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
            eventsOnDate = await eventService.findAllEvents(query, 4);
        }

        // Send the events happening on the specified date as a response
        res.status(200).json({
            success: true,
            data: eventsOnDate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.getTrendingEvents = async (req, res) => {

    let events;

    const today = new Date()
    // const today = moment().utc()
    console.log(today)

    // const currentDay = "sunday"
    const query = {
        verified: true,
        trending: true,
        type: 'event',
        $or: [
            { // Events with start date greater than or equal to today
                'date.dateRange.endDate': { $gte: today }
            },
            { // Events with recurring field containing today's day
                'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
            },
        ],

    }

    events = await eventService.findAllEvents(query)

    let trendingEvents = []

    for (const event of events) {
        if (event.trending == true) {
            trendingEvents.push(event)
        }

        for (const category of event.categories) {
            if (category.bookedSeats.length / category.seats >= 0.8 && category.bookedSeats.length / category.seats < 1) {
                trendingEvents.push(event)
            }
        }

    }

    if (trendingEvents.length < 4) {
        let i = 0
        while (trendingEvents.length < 4) {
            trendingEvents.push(events[i])
            i++
        }

    }

    console.log(trendingEvents.length)

    for (let i = 0; i < trendingEvents.length; i++) {
        if (trendingEvents[i] == null) {
            trendingEvents.pop(trendingEvents[i])
        }
    }

    res.status(200).json({
        success: true,
        data: events
    })
}


exports.getDateWiseEvents = async (req, res) => {
    try {
        const { date } = req.body
        let query;
        if (!date) {
            const filterDate = moment().format("YYYY-MM-DD")
            const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
            console.log(todayDate)
            const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

            query = {
                showInEventCalender: true,
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
        } else {
            const onlyDate = moment(date).format("YYYY-MM-DD")
            const startDate = new Date(`${onlyDate}T00:00:00.000Z`)
            const endDate = new Date(`${onlyDate}T23:00:00.000Z`)
            const currentDay = moment(startDate).format('dddd').toLowerCase()

            console.log(startDate)
            console.log(endDate)

            query = {
                archived: false,
                showInEventCalender: true,
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
                    // ,
                    // {
                    //     'date.dateRange.startDate': { $lte: startDate },
                    // }
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
        const events = await EventModel.find(query).sort({ 'date.dateRange.startDate': 1 }).populate('location');

        if (date) {
            const groupedEvents = events.reduce((acc, event) => {
                const eventDate = moment(date).startOf('day').format('YYYY-MM-DD');
                if (!acc[eventDate]) {
                    acc[eventDate] = [];
                }
                acc[eventDate].push(event);
                return acc;
            }, {});
            return res.status(200).json(groupedEvents);
        }

        // If date is not provided, return events grouped for today's date or before
        const groupedEvents = events.reduce((acc, event) => {
            let eventDate = moment(event.date.dateRange.startDate).startOf('day').format('YYYY-MM-DD');
            if (eventDate < moment().startOf('day').format('YYYY-MM-DD')) {
                eventDate = moment().startOf('day').format('YYYY-MM-DD');
            }
            if (!acc[eventDate]) {
                acc[eventDate] = [];
            }
            acc[eventDate].push(event);
            return acc;
        }, {});

        return res.status(200).json(groupedEvents);


    } catch (error) {
        console.log(error)
    }
}
// --------------------offers -------------------


exports.getAllOffers = async (req, res) => {

    try {

        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T23:00:00.000Z`)
        const day = moment(todayDate).format('dddd').toLowerCase()
        offers = await eventService.findAllEvents(
            {
                // Assuming you pass the vendor id as a route parameter
                type: 'offer',
                verified: true,
                archived: false,
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
            },
            4
        )

        return res.status(200).json({
            success: true,
            data: offers
        })

    } catch (error) {
        console.log(error)
    }

}

exports.deleteOffer = async (req, res) => {
    console.log(req.body)
    const offerid = req.body.offerid
    console.log(offerid)
    try {

        const offer = await offerService.deleteOffer(offerid)
        console.log(offer)
        if (offer) {
            return res.status(200).json({
                success: true,
                data: "Offer deleted successfully"
            })

        } else {
            return res.status(400).json({
                success: true,
                data: "something went wrong"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }
}

exports.deleteEvent = async (req, res) => {
    const { eventid } = req.body

    try {
        const event = await eventService.deleteEvent({ _id: eventid })
        if (!event) {
            return res.status(400).json({
                success: true,
                data: "something went wrong"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: "Event deleted successfully"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }
}

exports.getVendorAllEvents = async (req, res) => {

    const { vendorid } = req.params

    console.log(vendorid)
    try {
        const events = await eventService.findAllEvents({ vendorid: vendorid })

        // if (!events) {
        //     return res.status(404).json({
        //         success: false,
        //         data: "no events found"
        //     })
        // }

        return res.status(200).json({
            success: true,
            data: events
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getEventsForAdmin = async (req, res) => {
    try {
        let eventsOnDate;
        let query = {
            // verified: true
            type: 'event'
        };
        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
        const day = moment(todayDate).format('dddd').toLowerCase()

        query['$or'] = [
            {
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                ]
            }
            ,
            {
                $and: [
                    {
                        'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
                    },
                    {
                        $or: [
                            {
                                'date.recurring.endDate': { $gte: todayDate }
                            },
                            {
                                'date.recurring.endDate': null
                            }
                        ]
                    }
                ]
            }
        ];

        eventsOnDate = await eventService.findAllEvents(query);
        res.status(200).json({
            success: true,
            data: eventsOnDate,
        })
    } catch (error) {
        console.log(error)
    }

}

exports.getOffersForAdmin = async (req, res) => {
    try {
        let eventsOnDate;
        let query = {
            // verified: true
            type: 'offer'
        };
        const filterDate = moment().format("YYYY-MM-DD")
        const todayDate = new Date(`${filterDate}T00:00:00.000Z`)
        const day = moment(todayDate).format('dddd').toLowerCase()

        query['$or'] = [
            {
                $or: [
                    {
                        'date.dateRange.endDate': { $gte: todayDate }
                    },
                    {
                        'date.dateRange.endDate': null
                    }
                ]
            }
            ,
            {
                $and: [
                    {
                        'date.recurring.days': { $in: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }
                    },
                    {
                        $or: [
                            {
                                'date.recurring.endDate': { $gte: todayDate }
                            },
                            {
                                'date.recurring.endDate': null
                            }
                        ]
                    }
                ]
            }
        ];

        eventsOnDate = await eventService.findAllEvents(query);
        res.status(200).json({
            success: true,
            data: eventsOnDate,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.adminVerifyEvent = async (req, res) => {

    const { eventid } = req.body.data
    console.log(req.body)

    try {
        let event = await eventService.findEvent({ _id: eventid })
        console.log(event)

        if (!event) {
            return res.status(404).json({
                success: false,
                data: "Event not found"
            })
        } else if (event.location.verified == false) {
            return res.status(400).json({
                succss: false,
                data: `Please Verify Venue ${event.location.name} first which is associated with this event `
            })
        }

        const updatedData = {
            _id: eventid,
            verified: true
        }

        event = await eventService.updateEvent(updatedData)

        return res.status(200).json({
            success: true,
            data: "Event Verified Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createIcsFileAndSend = async (req, res) => {
    try {
        const { eventId } = req.body

        const event = await eventService.findEvent({ _id: eventId })

        let startDate;
        let endDate;
        const today = moment().startOf('day'); // Get today's date, without time

        if (event.date.type === 'dateRange') {
            startDate = moment(event.date.dateRange.startDate);
            if (startDate.isBefore(today)) {
                startDate = today; // If startDate is before today, set it to today
            }
            endDate = event.date.dateRange.endDate ? moment(event.date.dateRange.endDate) : startDate.clone().endOf('day');
        } else if (event.date.type === 'recurring') {
            startDate = moment(event.date.recurring.startDate);
            if (startDate.isBefore(today)) {
                startDate = today; // If startDate is before today, set it to today
            }
            endDate = event.date.recurring.endDate ? moment(event.date.recurring.endDate) : startDate.clone().endOf('day');
        }

        const date = new Date(startDate)


        ics.createEvent({
            title: event.title,
            description: event.shortDescription,
            busyStatus: 'FREE',
            start: [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                date.getMinutes()
            ],
            location: event.location.name,
            organizer: {
                name: event.vendorid.name,
                email: event.vendorid.email
            }
        }, (error, value) => {
            if (error) {
                console.log(error);
                return;
            }

            // Write the .ics file
            const icsFilePath = `${__dirname}/event.ics`;
            writeFileSync(icsFilePath, value);

            // Define email content
            const mailOptions = {
                from: 'argademayur2002@gmail.com',
                to: req.user.email,
                subject: 'Meeting Invitation: ' + event.title,
                text: 'This is a meeting invitation. Please see the attached ICS file for details.',
                attachments: [
                    {
                        filename: 'event.ics',
                        path: icsFilePath
                    }
                ]
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        data: "Failed to send a mail"
                    })
                    console.error(error);
                } else {
                    res.status(200).json({
                        success: true,
                        data: "Invitation sent succesfully"
                    })
                }
            });
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}