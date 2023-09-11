const jwt = require('jsonwebtoken');
const RefreshModel = require('../models/RefreshModel')
require('dotenv').config();
const accessTokenSecret = "thisisaccesstokensecret"
const refreshTokenSecret = "thisrefreshTokenSecret"

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
          expiresIn: "1m",
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
          expiresIn: "1y",
        });
        return { accessToken, refreshToken };
      }
    
      async storeRefreshToken(token, userId) {
        try {
          await RefreshModel.create({
            tokens: token,
            userid: userId,
          });
        } catch (error) {
          console.log(error);
        }
      }
    
      async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
      }
    
      async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret);
      }
    
      async findRefreshToken(userid, token) {
        return await RefreshModel.findOne({ userid: userid, tokens: token });
      }
    
      async updateRefreshToken(userId, refreshToken) {
        return await RefreshModel.updateOne(
          { userid: userId },
          { tokens: refreshToken }
        );
      }
    
      async removeToken(refreshToken) {
        return await RefreshModel.deleteOne({ tokens: refreshToken });
      }
}

module.exports = new TokenService();
