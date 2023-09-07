const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
    async generateTokens(payload) {
        // console.log(payload)
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET, {
            expiresIn: "1h",
        });
        // console.log("token generated from service",accessToken)
        return accessToken;

    }

    async verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET);
    }

}

module.exports = new TokenService();
