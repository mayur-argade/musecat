const statusCode = require('../data/statusCode');
const vendorService = require('../services/vendor-service')
const tokenService = require('../services/token-service')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt');
const userService = require('../services/user-service');
const crypto = require('crypto')
const passport = require('passport')
const { transporter } = require('../services/mail-service')


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
            return res.status(statusCode.CONFLICT.code).json({ message: "This email already exist try signing in" })
        }

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
                crImage: uploadedCrImage.secure_url,
                emailVerificationToken: token
            }
        }

        user = await vendorService.createVendor(data)

        user.password = null

        const mailOptions = {
            from: 'argademayur2002@gmail.com',
            to: email,
            subject: 'Account Verification for Muscat',
            html: `
              <html>
              <body>
                <p>Dear ${firstname} ${lastname},</p>
                <p>Thank you for registering vendor account with omanwhereto.com. To complete your registration and activate your account, please click on the following link:</p>
                <p><a href="http://localhost:3000/vendor/verify-account/${token}" target="_blank">Verify Your Account</a></p>
                <p>This link will expire in 10 minutes, so please verify your account as soon as possible.</p>
                <p>If you did not create this account, please ignore this email.</p>
                <p>Thank you for choosing omanwhereto.com.</p>
                <p>Best regards,<br>The omanwhereto Team</p>
              </body>
              </html>
            `,
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
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
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
                return res.status(404).json({
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

exports.clientGoogleLogin = async (req, res) => {
    return res.status(200).json("ok google")
}

exports.register = async (req, res) => {

    const { email, username, password, mobilenumber } = req.body

    if (!email || !username || !password || !mobilenumber) {
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
                data: "Account with this email Id already exist try signing in"
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
            html: `
              <html>
              <body>
                <p>Dear ${username},</p>
                <p>Thank you for registering with omanwhereto.com. To complete your registration and activate your account, please click on the following link:</p>
                <p><a href="http://localhost:3000/user/verify-account/${token}" target="_blank">Verify Your Account</a></p>
                <p>This link will expire in 10 minutes, so please verify your account as soon as possible.</p>
                <p>If you did not create this account, please ignore this email.</p>
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

exports.vendorEmailVerify = async (req, res) => {
    try {

        const { token } = req.params

        const filter = {
            verificationToken: token
        }

        const data = { emailVerified: true, emailVerificationToken: null }

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
                    <p><a href="http://localhost:3000/user/reset-password/${token}" target="_blank">Reset Your Password</a></p>
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
                            data: `Email sent successFully Kindly check your email ${token}`
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
    }

}