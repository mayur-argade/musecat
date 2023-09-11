const statusCode = require('../data/statusCode');
const vendorService = require('../services/vendor-service')
const tokenService = require('../services/token-service')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt');
const userService = require('../services/user-service');

exports.vendorRegister = async (req, res) => {

    const { firstname, lastname, email, password, mobilenumber, address, accountType, companyname, companyDisplayName, crNo, logo, crImage } = req.body

    if (!firstname, !lastname, !email, !password, !mobilenumber, !address, !accountType, !companyname, !companyDisplayName, !crNo) {
        res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: "All field are mandatory"
        })
    }
    let user = {}
    try {
        user = await vendorService.findVendor({ email: email })
        if (!user) {
            let uploadedLogo = ''
            let uploadedCrImage = ''


            if (logo) {
                uploadedLogo = await cloudinary.v2.uploader.upload(logo, {
                    folder: "muscat/vendor",
                })
            }

            if (crImage) {
                uploadedCrImage = await cloudinary.v2.uploader.upload(crImage, {
                    folder: "muscat/vendor",
                })
            }

            // console.log(uploadedCrImage)
            // console.log(uploadedLogo)

            const data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                mobilenumber: mobilenumber,
                address: address,
                accountType: accountType,
                companyname: companyname,
                companyDisplayName: companyDisplayName,
                crNo: crNo,
                logo: uploadedLogo.secure_url,
                crImage: uploadedCrImage.secure_url
            }

            user = await vendorService.createVendor(data)
        } else {
            return res.status(statusCode.CONFLICT.code).json({ message: "This email already exist try signing in" })
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
    }

    const accessToken = await tokenService.generateTokens({
        _id: user._id,
        activated: false,
    });

    user.password = null
    // console.log(accessToken)
    res
        .status(statusCode.SUCCESS.code)
        .cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true, sameSite: 'none'
        })
        .json({ message: "user", data: user });

}

exports.vendorLogin = async (req, res) => {
    // get email and password from the user
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            data: "All field are manadatory"
        })
    }


    let updatedUser;
    try {
        let user = await vendorService.findVendor({ email: email })

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "User does not found"
            })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(401).json({
                    success: false,
                    data: "Incorrect password"
                });
            }

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                    secure: true, sameSite: 'none'
                })
                .cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                    secure: true, sameSite: 'none'
                })
                .json({ user: user });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.clientLogin = async (req, res) => {
    // get email and password from the user
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            data: "All field are manadatory"
        })
    }


    let updatedUser;
    try {
        let user = await userService.findUser({ email: email })

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "User does not found"
            })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(401).json({
                    success: false,
                    data: "Incorrect password"
                });
            }

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })
                .cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })
                .json({ user: user });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.clientRegister = async (req, res) => {

    const { email, username, password, mobilenumber } = req.body

    if (!email || !username || !password || !mobilenumber) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: statusCode.BAD_REQUEST.message
        })
    }
    try {
        const user = await userService.findUser({ email: email })
        if (user) {
            return res.status(statusCode.CONFLICT.code).json({
                success: false,
                data: statusCode.CONFLICT.message
            })
        }

        const data = {
            email: email,
            username: username,
            password: password,
            mobilenumber: mobilenumber
        }

        const newUser = await userService.createUser(data)

        const accessToken = await tokenService.generateTokens({
            _id: newUser._id,
        });

        newUser.password = null
        // console.log(accessToken)
        res
            .status(statusCode.SUCCESS.code)
            .cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            })
            .json({
                success: true,
                data: newUser
            });

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: error
        })
    }

}

exports.refresh = async (req, res) => {
    // Get refresh token from the request cookies
    const { refreshtoken: refreshTokenFromCookie } = req.cookies;

    console.log(refreshTokenFromCookie)

    try {
        // Verify the refresh token
        const userdata = await tokenService.verifyRefreshToken(refreshTokenFromCookie);

        console.log(userdata)
        // Check if the user exists in the user table
        let user = await userService.findUser({ _id: userdata._id });


        // If the user doesn't exist in the user table, check the vendor table
        if (!user) {
            user = await vendorService.findVendor({ _id: userdata._id });

            // If the user doesn't exist in either table, return an error
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        console.log(user)

        // Generate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({ _id: userdata._id });

        // Update the refresh token
        await tokenService.updateRefreshToken(userdata._id, refreshToken);

        // Set the new tokens in cookies and send the user object in the response
        res
            .status(200)
            .cookie("refreshtoken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            })
            .cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            })
            .json({ user: user });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

exports.logout = async (req, res) => {
    // delete refresh token from db
    const { refreshtoken } = req.cookies;
    console.log(refreshtoken)

    await tokenService.removeToken(refreshtoken);
    // clear cookie
    res
        .clearCookie("refreshtoken")
        .clearCookie("accessToken")
        .status(200)
        .json({ user: null, auth: false });
};