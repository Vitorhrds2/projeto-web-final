const express = require('express')

const Controller = require('../../controllers/Web/CreateUserController')

const Router = express.Router()

Router.get("/etapa1", Controller.getCadastroEtapa1)
Router.post("/etapa1", Controller.postCadastroEtapa1)

Router.get("/etapa2", Controller.getCadastroEtapa2)
Router.post("/etapa2", Controller.postCadastroEtapa2)

Router.get("/etapa3", Controller.getCadastroEtapa3)
Router.post("/etapa3", Controller.postCadastroEtapa3)

Router.get("/etapa4", Controller.getCadastroEtapa4)
Router.post("/etapa4", Controller.postCadastroEtapa4)

Router.get("/etapa5", Controller.getCadastroEtapa5)
Router.post("/etapa5", Controller.postCadastroEtapa5)

Router.get("/etapa6", Controller.getCadastroEtapa6)
Router.post("/etapa6", Controller.postCadastroEtapa6)

module.exports = Router;