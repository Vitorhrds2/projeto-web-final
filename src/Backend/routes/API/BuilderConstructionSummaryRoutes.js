const express = require('express')

const SummaryController = require('../../controllers/API/SummaryController')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')

const Router = express.Router()

// CREATE
Router.post("/", AuthMiddleware.onlyLogged, SummaryController.create)

// READ
Router.get("/", AuthMiddleware.onlyLogged, SummaryController.all)
Router.get("/:id", AuthMiddleware.onlyLogged, SummaryController.get)

// UPDATE
Router.put("/:id", AuthMiddleware.onlyLogged, SummaryController.update) // UPDATE API

// DELETE
Router.delete("/:id", AuthMiddleware.onlyLogged, SummaryController.delete) // DELETE API

module.exports = Router;