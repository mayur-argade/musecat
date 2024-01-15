const statusCode = require('../data/statusCode');
const vendorService = require('../services/vendor-service')
const tokenService = require('../services/token-service')
const notificationService = require('../services/notification-service')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt');
const userService = require('../services/user-service');
const crypto = require('crypto')
const { transporter } = require('../services/mail-service')
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis')
const moment = require('moment');
const { userSignupEmail, vendorSignupEmail } = require('../data/emailTemplates');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

// client APIS
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

            if (user.isVerified == false) {
                return res.status(statusCode.BAD_REQUEST.code).json({
                    success: false,
                    data: "Kindly verify your account for signing in"
                }
                )
            }

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            const UserDto = {
                _id: user._id,
                email: user.email,
                username: user.username,
                isVerified: user.isVerified,
                mobilenumber: user.mobilenumber,
                firstname: user.firstname,
                lastname: user.lastname,
                photo: user.photo,
                type: user.type
            }

            res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true,
                })
                .cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })
                .json({ user: UserDto });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error. Please try again later."
        });
    }
}

exports.register = async (req, res) => {

    const { email, username, password, mobilenumber } = req.body

    if (!email || !username || !password) {
        return res.status(statusCode.BAD_REQUEST.code).json({
            success: false,
            data: statusCode.BAD_REQUEST.message
        })
    }

    try {
        let user = await userService.findUser({ email: email })
        if (user) {
            return res.status(statusCode.CONFLICT.code).json({
                success: false,
                data: "Account with this email already exist try signing in"
            })
        }

        let usernameExist = await userService.findUser({ username: username })

        if (usernameExist) {
            return res.status(statusCode.CONFLICT.code).json({
                success: false,
                data: "Username Already Exists"
            })
        }

        const token = crypto.randomBytes(Math.floor(Math.random() * 6) + 10).toString('hex');

        const data = {
            email: email,
            username: username,
            password: password,
            verificationToken: token,
            mobilenumber: mobilenumber
        }

        const newUser = await userService.createUser(data)

        newUser.password = null

        // console.log(accessToken)

        const mailOptions = {
            from: 'argademayur2002@gmail.com',
            to: email,
            subject: 'Account Verification for Muscat',
            html: userSignupEmail(username, token),
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                        success: false,
                        data: "failed to send email try again"
                    });
            } else {
                return res
                    .status(statusCode.SUCCESS.code).json({
                        success: true,
                        data: `Email sent successFully Kindly Verify your account ${token}`
                    });
            }
        });



    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: error
        })
    }

}

exports.facebookLogin = async (req, res) => {
    try {
        const { email, name } = req.body

        const user = await userService.findUser({ email: email })

        if (!user) {
            // create user
            let [username] = email.split("@")
            const nameArray = name.split(' ')
            const userNameExists = await userService.findUser({ username: username })

            if (userNameExists) {
                const randomNumber = Math.floor(Math.random() * 900) + 100;
                username = `${username}${randomNumber}`
            }

            const data = {
                email: email,
                username: username,
                firstname: nameArray[0],
                lastname: nameArray[1],
                isVerified: true
            }

            const saveUser = await userService.createUser(data)

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: saveUser._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            const userResponse = {
                _id: user._id,
                email: user.email,
                username: user.username,
                isVerified: user.isVerified,
                mobilenumber: user.mobilenumber,
                firstname: user.firstname,
                lastname: user.lastname,
                photo: user.photo,
                type: user.type
            }
            res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true,
                })
                .cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })
                .json({ user: userResponse });

        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        const UserDto = {
            _id: user._id,
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            mobilenumber: user.mobilenumber,
            firstname: user.firstname,
            lastname: user.lastname,
            photo: user.photo,
            type: user.type
        }

        res
            .status(200)
            .cookie("refreshtoken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
            })
            .cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            })
            .json({ user: UserDto });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.clientGoogleLogin = async (req, res) => {
    console.log(req.body)
    const { code } = req.body

    const getTokens = async (code) => {
        try {
            const response = await oauth2Client.getToken(code)
            return response.tokens
        } catch (error) {
            console.log(error)
        }
    }


    const getUserInfo = async (access_token) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        console.log(response)
        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch user information from Google.');
        }

        const userData = await response.json();
        return userData;
    };

    try {
        const { access_token, refresh_token: google_refresh } = await getTokens(code)
        const userInfo = await getUserInfo(access_token);
        const user = await userService.findUser({ email: userInfo.email })

        if (!user) {
            // create user
            let [username] = userInfo.email.split("@")
            const userNameExists = await userService.findUser({ username: username })

            if (userNameExists) {
                const randomNumber = Math.floor(Math.random() * 900) + 100;
                username = `${username}${randomNumber}`
            }

            let data = {
                email: userInfo.email,
                username: username,
                firstname: userInfo.given_name,
                lastname: userInfo.family_name,
                isVerified: userInfo.verified_email,
                photo: userInfo.picture
            }

            if (google_refresh) {
                data.google_refresh = google_refresh
            }

            const saveUser = await userService.createUser(data)

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: saveUser._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, saveUser._id);

            const userResponse = {
                _id: saveUser._id,
                email: saveUser.email,
                username: saveUser.username,
                isVerified: saveUser.isVerified,
                mobilenumber: saveUser.mobilenumber,
                firstname: saveUser.firstname,
                lastname: saveUser.lastname,
                photo: saveUser.photo,
                type: saveUser.type
            }
            return res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true,
                })
                .cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })
                .json({ user: userResponse });

        }

        if (google_refresh) {
            const update_data = {
                _id: user._id,
                google_refresh: google_refresh
            }

            const updateUser = await userService.updateUser(update_data)
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        const UserDto = {
            _id: user._id,
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            mobilenumber: user.mobilenumber,
            firstname: user.firstname,
            lastname: user.lastname,
            photo: user.photo,
            type: user.type
        }

        return res
            .status(200)
            .cookie("refreshtoken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
            })
            .cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            })
            .json({ user: UserDto });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
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

        // Generate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({ _id: userdata._id });

        // Update the refresh token
        await tokenService.updateRefreshToken(userdata._id, refreshToken);

        // Set the new tokens in cookies and send the user object in the response
        res
            .status(200)
            .cookie("refreshtoken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
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

exports.verify = async (req, res) => {
    try {

        const { token } = req.params

        const filter = {
            verificationToken: token
        }

        const data = { isVerified: true, verificationToken: null }

        const user = await userService.findAndUpdateUser(filter, data)

        const verifiedUser = await userService.findUser({ _id: user._id })

        if (verifiedUser.verificationToken == null && verifiedUser.isVerified == true) {
            return res.status(statusCode.SUCCESS.code).json("Account Verification Successfull")
        } else {
            return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json("Failed to activate user Contact customer service")
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json(statusCode.INTERNAL_SERVER_ERROR.message)
    }
}

exports.sendMailForgotPassword = async (req, res) => {
    try {

        const { email } = req.body

        const user = await userService.findUser({ email: email })

        if (!user) {
            return res.status(404).json({
                success: true,
                data: "User not found kindly register"
            })
        }

        const token = crypto.randomBytes(Math.floor(Math.random() * 6) + 10).toString('hex');

        const data = {
            _id: user._id,
            passwordToken: token
        }

        const updatedUser = userService.updateUser(data)
        if (updatedUser) {
            const mailOptions = {
                from: 'argademayur2002@gmail.com',
                to: email,
                subject: 'Reset Password for Muscat',
                html: `
                  <html>
                  <body>
                    <p>Dear ${user.username},</p>
                    <p><a href="https://www.omanwhereto.com/user/reset-password/${token}" target="_blank">Reset Your Password</a></p>
                    <p>This link will expire in 10 minutes, so please verify your account as soon as possible.</p>
                    <p>Thank you for choosing omanwhereto.com.</p>
                    <p>Best regards,<br>The omanwhereto Team</p>
                  </body>
                  </html>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    return res
                        .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                            success: false,
                            data: "failed to send email try again"
                        });
                } else {
                    return res
                        .status(statusCode.SUCCESS.code).json({
                            success: true,
                            data: `Email sent successFully Kindly check your email`
                        });
                }
            });
        } else {
            return res.status(500).json({
                success: false,
                data: "failed to generate a token"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.resetpassword = async (req, res) => {
    try {

        const { token, password } = req.body

        const user = await userService.findUser({ passwordToken: token })

        console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "reset request not found for the password for this user"
            })
        }

        const data = {
            _id: user._id,
            password: password,
            passwordToken: null
        }

        const updatedUser = await userService.updateUser(data)
        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                data: "failed to update password try again after some time"
            })
        }

        return res.status(200).json({
            success: true,
            data: "Password updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }

}

exports.addToCalender = async (req, res) => {
    let { title, shortDescription, location, startTime, endTime } = req.body

    console.log(startTime, endTime)
    if (startTime == null) {
        startTime = new Date()
    }
    if (endTime == null) {
        const customeDate = moment(startTime).format("YYYY-MM-DD")
        endTime = new Date(`${customeDate}T23:00:00.000Z`)
    }
    oauth2Client.setCredentials({ refresh_token: req.user.google_refresh })

    const calenderasdf = google.calendar("v3")

    const response = await calenderasdf.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: {
            summary: title,
            description: shortDescription,
            location: location,
            colourId: '5',
            start: {
                dateTime: startTime
            },
            end: {
                dateTime: endTime
            }
        }
    })

    console.log(response.status)
    if (response.status == 200) {
        return res.status(200).json({
            success: true,
            data: "Added To your calender"
        })
    }
}



// vendor
exports.vendorRegister = async (req, res) => {

    const { firstname, lastname, email, password, mobilenumber, address, accountType, companyname, companyDisplayName, crNo, logo, crImage, role, isVerified } = req.body

    if (!role) {
        if (!firstname || !lastname || !email || !password || !mobilenumber || !address || !accountType || !companyname || !companyDisplayName || !crNo) {
            return res.status(statusCode.BAD_REQUEST.code).json({
                success: false,
                data: "All field are mandatory"
            })
        }
    }

    try {
        let user = await vendorService.findVendor({ email: email })
        if (user) {
            return res.status(statusCode.CONFLICT.code).json({
                success: false,
                data: "This email already exist try signing in"
            })
        }

        let uploadedLogo = ''
        let uploadedCrImage = ''


        if (logo) {
            uploadedLogo = await cloudinary.v2.uploader.upload(logo, {
                folder: "muscat/vendor",
            })
        }

        let data;

        const token = crypto.randomBytes(Math.floor(Math.random() * 6) + 10).toString('hex');

        if (role == "admin") {
            data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                isVerified: true,
                emailVerified: true,
                password: password,
                role: role,
                mobilenumber: mobilenumber,
            }
        } else {
            data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                isVerified: isVerified,
                password: password,
                role: role,
                mobilenumber: mobilenumber,
                address: address,
                accountType: accountType,
                companyname: companyname,
                companyDisplayName: companyDisplayName,
                crNo: crNo,
                logo: uploadedLogo.secure_url,
                crImage: crImage,
                emailVerificationToken: token
            }
        }

        user = await vendorService.createVendor(data)

        user.password = null

        const mailOptions = {
            from: 'argademayur2002@gmail.com',
            to: email,
            subject: 'Account Verification for Muscat',
            html: vendorSignupEmail(firstname, lastname, token),
        };

        if (role == "admin") {
            return res.status(200).json({
                success: true,
                data: user
            })
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                        success: false,
                        data: "failed to send email try again"
                    });
            } else {
                return res
                    .status(statusCode.SUCCESS.code).json({
                        success: true,
                        data: `Email sent successFully Kindly Verify your account ${token}`
                    });
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            data: "Internal server error"
        });
    }

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
        }
        else if (user.role == 'vendor' && user.emailVerified == false) {
            return res.status(404).json({
                success: false,
                data: "Verify your Email address"
            })
        }
        else {
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
                    maxAge: 1000 * 60 * 60 * 24 * 365,
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

exports.vendorFacebookLogin = async (req, res) => {
    try {
        const { email, name } = req.body

        const user = await vendorService.findVendor({ email: email })

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "Vendor does not found"
            })
        }

        if (user.role == 'vendor' && user.emailVerified == false) {
            return res.status(404).json({
                success: false,
                data: "Verify your Email address"
            })
        }

        else {

            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
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

exports.vendorGoogleLogin = async (req, res) => {
    console.log(req.body)
    const { code } = req.body

    const getTokens = async (code) => {
        try {
            const response = await oauth2Client.getToken(code)
            return response.tokens
        } catch (error) {
            console.log(error)
        }
    }


    const getUserInfo = async (access_token) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        console.log(response)
        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch user information from Google.');
        }

        const userData = await response.json();
        return userData;
    };

    try {
        const { access_token, refresh_token: google_refresh } = await getTokens(code)
        const userInfo = await getUserInfo(access_token);
        const user = await vendorService.findVendor({ email: userInfo.email })

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "Vendor does not found"
            })

        }

        if (google_refresh) {
            const update_data = {
                _id: user._id,
                google_refresh: google_refresh
            }

            const updateUser = await vendorService.updateVendor(update_data)
        }

        if (user.role == 'vendor' && user.emailVerified == false) {
            return res.status(404).json({
                success: false,
                data: "Verify your Email address"
            })
        }

        else {
            const { accessToken, refreshToken } = tokenService.generateTokens({
                _id: user._id,
                activated: false,
            });

            await tokenService.storeRefreshToken(refreshToken, user._id);

            res
                .status(200)
                .cookie("refreshtoken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
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

exports.vendorEmailVerify = async (req, res) => {
    try {

        const { token } = req.params

        console.log(token)
        const vendor = await vendorService.findVendor({ emailVerificationToken: token })
        console.log(vendor)

        if (!vendor) {
            return res.status(404).json("Authentication Link expired")
        }

        const data = { _id: vendor, emailVerified: true, emailVerificationToken: null }

        const updateVendor = await vendorService.updateVendor(data)

        const verifiedUser = await vendorService.findVendor({ _id: vendor._id })

        if (verifiedUser.emailVerificationToken == null && verifiedUser.emailVerified == true) {
            return res.status(statusCode.SUCCESS.code).json("Account Verification Successfull")
        } else {
            return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json("Failed to activate user Contact customer service")
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json(error)
    }
}

exports.sendForgetMailToVendor = async (req, res) => {
    try {

        const { email } = req.body

        const vendor = await vendorService.findVendor({ email: email })

        if (!vendor) {
            return res.status(404).json({
                success: true,
                data: "vendor not found kindly register"
            })
        }

        const token = crypto.randomBytes(Math.floor(Math.random() * 6) + 10).toString('hex');

        const data = {
            _id: vendor._id,
            passwordToken: token
        }

        const updatedUser = vendorService.updateVendor(data)
        if (updatedUser) {
            const mailOptions = {
                from: 'argademayur2002@gmail.com',
                to: email,
                subject: 'Reset Password for Muscat',
                html: `
                  <html>
                  <body>
                    <p>Dear ${vendor.firstname},</p>
                    <p><a href="https://www.omanwhereto.com/vendor/reset-password/${token}" target="_blank">Reset Your Password</a></p>
                    <p>This link will expire in 10 minutes, so please verify your account as soon as possible.</p>
                    <p>Thank you for choosing omanwhereto.com.</p>
                    <p>Best regards,<br>The omanwhereto Team</p>
                  </body>
                  </html>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    return res
                        .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                            success: false,
                            data: "failed to send email try again"
                        });
                } else {
                    return res
                        .status(statusCode.SUCCESS.code).json({
                            success: true,
                            data: `Email sent successFully Kindly check your email`
                        });
                }
            });
        } else {
            return res.status(500).json({
                success: false,
                data: "failed to generate a token"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }

}

exports.resetVendorPassword = async (req, res) => {
    try {

        const { token, password } = req.body

        const user = await vendorService.findVendor({ passwordToken: token })

        console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                data: "reset request not found for password for this vendor"
            })
        }

        const data = {
            _id: user._id,
            password: password,
            passwordToken: null
        }

        const updatedUser = await vendorService.updateVendor(data)
        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                data: "failed to update password try again after some time"
            })
        }

        return res.status(200).json({
            success: true,
            data: "Password updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }

}