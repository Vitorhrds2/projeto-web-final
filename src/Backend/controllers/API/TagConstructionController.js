const RelationsTagConstructionModel = require("../../models/TagConstructionModel");
const Controller = require("../Controller");

class RelationsTagConstructionController extends Controller {
    // CREATE
    static getCreateRelationsTagConstruction = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("aqui vai para uma página")
    })

    static CreateRelationsTagConstruction = (req, res) => Controller.execute(req, res, async (req, res) => {
        const relationsTagConstruction = new RelationsTagConstructionModel({
            construction_id: req.body.construction_id,
            tag_id: req.body.tag_id
        });

        await relationsTagConstruction.insert()

        res.json(relationsTagConstruction.getObject())
    })

    // READ
    static allRelationsByConstruction = (req, res) => Controller.execute(req, res, async (req, res) => {
        const constructionId = req.params.constructionId;
        const relationsTagConstruction = await RelationsTagConstructionModel.allByColumns({construction_Id: constructionId});
        res.json(relationsTagConstruction);
    })

    static allRelationsByTag = (req, res) => Controller.execute(req, res, async (req, res) => {
        const tagId = req.params.tagId;
        const relationsTagConstruction = await RelationsTagConstructionModel.allByColumns({tag_id: tagId});
        res.json(relationsTagConstruction);
    })

    static getConstructionRelations = (req, res) => Controller.execute(req, res, async (req, res) => {
        const constructionId = req.params.constructionId;
        const tagId = req.params.tagId
        const relationsTagConstruction = await RelationsTagConstructionModel.getByColumns({tag_id: tagId, construction_id: constructionId}, {tag: true, construction: true});
        res.json(relationsTagConstruction.getObject());
    })

    // UPDATE

    // DELETE
    static getDeleteRelationsTagConstruction = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static deleteConstructionRelation = (req, res) => Controller.execute(req, res, async (req, res) => {
        const constructionId = req.params.constructionId;
        const tagId = req.params.tagId;

        const relationsTagConstruction = await RelationsTagConstructionModel.getByColumns({construction_id: constructionId, tag_id: tagId})

        relationsTagConstruction.delete();

        res.json(`Relação entre tag e ob deletado com sucesso`)
    })

    static getBusca = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render(__dirname + '/../../Frontend/Main/Busca/Busca', {});
    })
}

module.exports = RelationsTagConstructionController