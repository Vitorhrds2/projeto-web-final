const TagModel = require("../../models/TagModel");
const Controller = require("../Controller");

class TagController extends Controller {
    // CREATE
    static getCreateTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("aqui vai uma página")
    })

    static postCreateTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        const tag = new TagModel({
            name: req.body.name
        });

        await tag.insert()

        res.json(tag.getObject())
    })

    // READ
    static getTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const tag = await TagModel.getByColumns({id: id})
        res.json(tag.getObject())
    })

    static getAllTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        const tag = await TagModel.allByColumns()
        
        res.json(tag)
    })

    // UPDATE
    static getUpdateTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static postUpdateTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const tag = await TagModel.getByColumns({id: id})

        tag.setName(req.body.name);

        tag.update();

        res.json(tag.getObject());
    })

    // DELETE
    static getDeleteTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static postDeleteTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const tag = await TagModel.getByColumns({id: id})

        tag.delete();

        res.json(`Tag de ID ${id} deletada com sucesso`)
    })

}

module.exports = TagController