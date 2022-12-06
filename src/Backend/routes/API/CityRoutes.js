const express = require('express')

const CityController = require('../../controllers/API/CityController')

const cityRouter = express.Router()

// CREATE
cityRouter.post("/", CityController.postCreateCity)

// READ
cityRouter.get("/", CityController.getAllCity)
cityRouter.get("/:id", CityController.getCity)

// UPDATE
cityRouter.put("/:id", CityController.postUpdateCity)

// DELETE
cityRouter.delete("/:id", CityController.postDeleteCity) // DELETE API

module.exports = cityRouter;