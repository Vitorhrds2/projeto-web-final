const express = require('express')

const ConstructionController = require('../../controllers/API/ContructionController')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')

const Router = express.Router()

// API
// Create
Router.post("/", AuthMiddleware.onlyLoggedADM, ConstructionController.create)

// Read
Router.get("/", ConstructionController.all)
Router.get("/:id", ConstructionController.get)

// Update
Router.put("/:id", AuthMiddleware.onlyLoggedADM, ConstructionController.update) // UPDATE API

// Delete
Router.delete("/:id", AuthMiddleware.onlyLoggedADM, ConstructionController.delete) // DELETE API

module.exports = Router;