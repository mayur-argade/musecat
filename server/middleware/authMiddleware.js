const vendorService = require('../services/vendor-service');
const statusCode = require('../data/statusCode')
const tokenService = require('../services/token-service')
const userService = require('../services/user-service')

exports.isLoggedin = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        // console.log("this is logged in", req.cookies)
        if (!accessToken) {
            throw new Error();
        }

        const userid = await tokenService.verifyAccessToken(accessToken);
        console.log(userid)
        // console.log(userid)

        const userData = await vendorService.findVendor({ _id: userid._id });
        if (userData) {
            // console.log(userData)
            req.user = userData;
            // console.log(res.user)
        }
        // console.log("this is not working")
        next(); // Call next() here, after the asynchronous operations are completed
    } catch (error) {
        console.log(error);
        return res.status(statusCode.UNAUTHORIZED.code).json({ message: "unauth" });
    }
};

exports.isUserLoggedin = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        // console.log(accessToken)
        // console.log("this is logged in", req.cookies)
        if (!accessToken) {
            throw new Error();
        }

        const userid = await tokenService.verifyAccessToken(accessToken);
        // console.log(userid)
        const userData = await userService.findUser({ _id: userid._id });
        console.log("user", userData)
        if (userData != null || userData != undefined) {
            console.log(userData)
            req.user = userData;
            // console.log(res.user)
        } else {
            throw new Error();
        }
        // console.log("this is not working")
        next(); // Call next() here, after the asynchronous operations are completed
    } catch (error) {
        console.log(error);
        return res.status(statusCode.UNAUTHORIZED.code).json({ message: "unauth" });
    }
};

exports.isVerified = async (req, res, next) => {
    try {
        // console.log(req.user)
        if (req.user.isVerified == true) {
            next();
        } else {
            return res.status(statusCode.FORBIDDEN.code).json({ message: statusCode.FORBIDDEN.message });
        }

    } catch (error) {
        console.log(error)
    }

}

exports.requiredRole = (requiredRole) => {
    return async (req, res, next) => {
        const { accessToken } = req.cookies;
        console.log("", req.cookies)
        try {
            if (!accessToken) {
                throw new Error();
            }

            const userid = await tokenService.verifyAccessToken(accessToken);
            console.log(userid)
            const userData = await userService.findUser({ _id: userid._id });
            console.log(userData)
            if (userData.role === requiredRole) {
                req.user = userData; // Attach user data to the request object
                next(); // User has the required role, proceed to the next middleware/route handler
            } else {
                res.status(statusCode.FORBIDDEN.code).json({ error: statusCode.FORBIDDEN.message });
            }
        } catch (error) {
            // console.log(error)
            res.status(statusCode.UNAUTHORIZED.code).json({ message: statusCode.UNAUTHORIZED.message });
        }
    };
};

