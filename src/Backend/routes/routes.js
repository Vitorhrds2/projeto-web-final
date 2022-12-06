// Requires
const express = require('express');
const Controller = require('../controllers/Controller');
const APIError = require('../services/ErrorService');

const ApiRouter = require('./API/routes');
const WebRouter = require('./Web/routes');

const Router = express.Router();

Router.use('/api', ApiRouter);
Router.use(WebRouter);

Router.all('*', (req, res) => Controller.execute(req, res, (req, res) => {
    throw new APIError('Page not Found', 404);
}))

module.exports = Router;