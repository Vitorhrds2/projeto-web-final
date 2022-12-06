const StateModel = require("../../models/StateModel");
const Controller = require("../Controller");

class StateController extends Controller {
    // CREATE
    static getCreateState = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("aqui vai uma página")
    })

    static postCreateState = (req, res) => Controller.execute(req, res, async (req, res) => {
        const state = new StateModel({
            name: req.body.name,
            uf: req.body.uf,
            capital_city_id: req.body.capital_city_id
        });

        await state.insert()

        res.json(state.getObject())
    })

    // READ
    static getState = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const state = await StateModel.getByColumns({id: id}, {capitalCity: true})
        res.json(state.getObject())
    })

    static getAllState = (req, res) => Controller.execute(req, res, async (req, res) => {
        const states = await StateModel.allByColumns()
        res.json(states)
    })

    // UPDATE
    static getUpdateState = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static postUpdateState = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const state = await StateModel.getByColumns({id: id})

        state.setName(req.body.name);
        state.setCapitalCityId(req.body.capital_city_id);
        state.setUf(req.body.uf);

        state.update();

        res.json(state.getObject());
    })

    // DELETE
    static getDeleteState = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static postDeleteState = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const state = await StateModel.getByColumns({id: id})

        await state.delete();

        res.json(`Estado de ID ${id} deletada com sucesso`)
    })

}

module.exports = StateController