const express = require('express')

const StateController = require('../../controllers/API/StateController')

const stateRouter = express.Router()

// CREATE
stateRouter.post("/", StateController.postCreateState)

// READ
stateRouter.get("/", StateController.getAllState)
stateRouter.get("/:id", StateController.getState)

// UPDATE
stateRouter.put("/:id", StateController.postUpdateState)

// DELETE
stateRouter.delete("/:id", StateController.postDeleteState)

module.exports = stateRouter;