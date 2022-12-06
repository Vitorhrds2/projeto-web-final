// Requires
const express = require('express');

// Web Routes
const StructuralRouter = require('./StructuralRoutes');
const CreateUserRouter = require('./CreateUserRoutes');
const UpdateUserRouter = require('./UpdateUserRoutes');
const DashboardRoutes = require('./DashboardRoutes');

const Router = express.Router();

Router.use(StructuralRouter);
Router.use('/cadastro', CreateUserRouter);
Router.use('/usuario', UpdateUserRouter);
Router.use('/dashboard', DashboardRoutes);

module.exports = Router;