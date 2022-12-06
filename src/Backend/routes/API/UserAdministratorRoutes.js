const express = require('express')

const Controller = require('../../controllers/API/AdministratorController')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')

const Router = express.Router()

// CREATE
Router.post("/", AuthMiddleware.onlyLoggedADM, Controller.postCreateUserAdministrator)

// READ
Router.post("/login", Controller.postLogin)

Router.get("/", AuthMiddleware.onlyLoggedADM, Controller.getAllUserAdministrator)
Router.get("/:id", AuthMiddleware.onlyLoggedADM, Controller.getUserAdministrator)

// UPDATE
Router.put("/:id", AuthMiddleware.onlyLoggedADM, Controller.postUpdateUserAdministrator) // UPDATE API

// DELETE
Router.delete("/:id", AuthMiddleware.onlyLoggedADM, Controller.postDeleteUserAdministrator) // DELETE API


module.exports = Router;