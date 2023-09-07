const offerService = require("../services/offer-service");
const eventService = require('../services/event-service');
const statusCode = require("../data/statusCode");

module.exports.getCategories = async (req, res) => {
    try {
        // Query the offers from the database
        const offers = await offerService.findAllOffer();

        // Group offers by category name and calculate the count for each category
        const categoryCounts = offers.reduce((acc, offer) => {
            const categoryName = offer.category; // Assuming you have a 'category' field in your offer schema
            if (!acc[categoryName]) {
                acc[categoryName] = 0;
            }
            acc[categoryName]++;
            return acc;
        }, {});

        // Create a response object with offer count and category data
        const response = Object.keys(categoryCounts).map((categoryName) => ({
            category: categoryName,
            count: categoryCounts[categoryName],
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
    const categoryDisplayName = req.params.categoryname
    console.log(categoryDisplayName)

    try {
        const events = await eventService.findAllEvents({ category: categoryDisplayName })
        return res.status(statusCode.SUCCESS.code).json({
            success: true,
            data: events
        })


    } catch (error) {
        console.log(error)
    }



}