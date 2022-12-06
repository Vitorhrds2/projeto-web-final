const express = require('express')

const TagController = require('../../controllers/API/TagController')

const tagRouter = express.Router()

// CREATE
tagRouter.post("/", TagController.postCreateTag)

// READ
tagRouter.get("/", TagController.getAllTag)
tagRouter.get("/:id", TagController.getTag)

// UPDATE
tagRouter.put("/:id", TagController.postUpdateTag)

// DELETE
tagRouter.delete("/:id", TagController.postDeleteTag)

module.exports = tagRouter;