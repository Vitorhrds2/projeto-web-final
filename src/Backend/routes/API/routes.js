// Requires
const express = require('express');

// API Routes
const AdministratorRouter = require('./UserAdministratorRoutes');
const UserRouter = require('./UserBuilderRoutes');
const ConstructionRouter = require('./ConstructionRoutes');
const TagRouter = require('./TagRoutes');
const SummaryRouter = require('./BuilderConstructionSummaryRoutes');
const CityRouter = require('./CityRoutes');
const StateRouter = require('./StateRoutes');
const InterestRouter = require('./ConstructionBuilderInterestrRoutes');

const Router = express.Router();

Router.use('/portifolios', SummaryRouter);
Router.use('/administradores', AdministratorRouter);
Router.use('/empreiteiros', UserRouter);
Router.use('/obras',ConstructionRouter);
Router.use('/tags', TagRouter);
Router.use('/cidades', CityRouter);
Router.use('/estados', StateRouter);
Router.use('/interesses', InterestRouter);

module.exports = Router;