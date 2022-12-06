const dotenv = require('dotenv').config({path: __dirname + '/../.env'});
const jwt = require('jsonwebtoken');
const APIError = require('./ErrorService');

class AuthService {
    static makeToken(id, userType = 'builder'){
        return jwt.sign(id, userType == 'adm' ? process.env.ADMINISTRATOR_SECRET_PASS : process.env.SECRET_PASS);
    }

    static verifyToken(token, userType = 'builder') {
        try {
            jwt.verify(token, userType == 'adm' ? process.env.ADMINISTRATOR_SECRET_PASS : process.env.SECRET_PASS);
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError){
                throw new APIError('Invalid token', 403)
            }else {
                throw error;
            }
        }
    }

    static getIdFromToken(token, userType = 'builder') {
        this.verifyToken(token, userType);

        return jwt.decode(token);
    }
}

module.exports = AuthService;