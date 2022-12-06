const APIError = require('../services/ErrorService');
const LogService = require('../services/LogService');

class Middleware {
    static async execute(req, res, next, callback) {
        try {            
            await callback(req, res, next);

            return next();
        } catch (error) {
            if(error instanceof APIError){
                LogService.logDanger(`API Error ${JSON.stringify(error)}`);

                res.status(error.status);
                res.json(error.getObjectForClient());
            } else {
                console.log(error);
                res.status(500);
                res.json({
                    status: 500,
                    message: 'Um erro interno ocorreu'
                })
            }
        }
    }
}

module.exports = Middleware;