const jwt = require('jsonwebtoken');
const RefreshModel = require('../models/RefreshModel')
require('dotenv').config();

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET, {
          expiresIn: "6h",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESHTOKEN_SECRET, {
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
        return jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET);
      }
    
      async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET);
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
