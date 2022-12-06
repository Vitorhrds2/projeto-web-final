const AuthService = require('../services/AuthService');
const APIError = require('../services/ErrorService');
const Middleware = require('./Middleware');

class AuthMiddleware {
    static onlyLogged = (req, res, next) => Middleware.execute(req, res, next, (req, res) => {
        return AuthService.getIdFromToken(req.headers.authorization);
    })

    static onlyLoggedADM = (req, res, next) => Middleware.execute(req, res, next, (req, res) => {
        return AuthService.getIdFromToken(req.headers.authorization, 'adm');
    })

    static onlyLoggedSite = (req, res, next) => Middleware.execute(req, res, next, (req, res) => {
        try {
            AuthService.getIdFromToken(req.cookies['AuthToken']);
        } catch(error) {
            if(error instanceof APIError && error.status == 403){ 
                res.redirect('/login');
            }
        }
    })

    static onlyLoggedADMSite = (req, res, next) => Middleware.execute(req, res, next, (req, res) => {
        try {
            AuthService.getIdFromToken(req.cookies['AuthToken']);
        } catch(error) {
            if(error instanceof APIError && error.status == 403){ 
                res.redirect('/');
            }
        }
    })
}

module.exports = AuthMiddleware;