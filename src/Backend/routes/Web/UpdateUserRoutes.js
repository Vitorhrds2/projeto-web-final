const express = require('express')

const Controller = require('../../controllers/Web/UpdateUserController')

const AuthMiddleware = require('../../middlewares/AuthMiddleware')

const Router = express.Router()

Router.get("/contador", AuthMiddleware.onlyLoggedSite, Controller.getEdicaoUsuarioContador)
Router.post("/contador", AuthMiddleware.onlyLoggedSite, Controller.getEdicaoUsuarioContador)

Router.get("/empresa", AuthMiddleware.onlyLoggedSite, Controller.getEdicaoUsuarioEmpresa)
Router.post("/empresa", AuthMiddleware.onlyLoggedSite, Controller.getEdicaoUsuarioEmpresa)

Router.get("/dono", AuthMiddleware.onlyLoggedSite, Controller.getEdicaoUsuarioDono)
Router.get("/dono", AuthMiddleware.onlyLoggedSite, Controller.getEdicaoUsuarioDono)

module.exports = Router;