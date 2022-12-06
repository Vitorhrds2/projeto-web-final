const express = require('express')

const Controller = require('../../controllers/Web/StructuralController')

const Router = express.Router()

// CREATE
Router.get("/busca", Controller.getBusca)

Router.get("/home", Controller.getHome)
Router.get("/", Controller.getHome)

Router.get("/login", Controller.getLogin)
Router.post("/login", Controller.postLogin)

Router.get("/institucional", Controller.getInstitucional)

Router.get("/obra/:id", Controller.getObra)


module.exports = Router;