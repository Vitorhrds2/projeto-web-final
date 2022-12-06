const express = require('express')
const Controller = require('../../controllers/API/InterestController')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')

const Router = express.Router()

// CREATE
Router.post("/", Controller.createBuilderInterest)

// READ
Router.get("/:constructionId", AuthMiddleware.onlyLogged, Controller.allBuilderInterestByConstruction)
Router.get("/", AuthMiddleware.onlyLogged, Controller.allBuilderInterestByBuilder)

// UPDATE

// DELETE
Router.delete("/:builderId", AuthMiddleware.onlyLogged, Controller.deleteBuilderInterest)

module.exports = Router;