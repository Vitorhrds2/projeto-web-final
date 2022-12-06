const CityModel = require("../../models/CityModel");
const Controller = require("../Controller");

class CityController extends Controller {
    // CREATE
    static getCreateCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("aqui vai uma página")
    })

    static postCreateCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        const city = new CityModel({
            name: req.body.name,
            state_id: req.body.state_id,
            number_people: req.body.number_people,
            is_capital: req.body.is_capital
        });

        await city.insert()

        res.json(city.getObject())
    })

    // READ
    static getCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const city = await CityModel.getByColumns({id: id}, {state: true})
        res.json(city.getObject())
    })

    static getAllCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        const cities = await CityModel.allByColumns()
        res.json(cities)
    })

    // UPDATE
    static getUpdateCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static postUpdateCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const city = await CityModel.getByColumns({id: id})

        city.setName(req.body.name);
        city.setIsCapital(req.body.is_capital);
        city.setNumberPeople(req.body.number_people);
        city.setStateId(req.body.state_id);

        city.update();

        res.json(city.getObject());
    })

    // DELETE
    static getDeleteCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("Página a construir")
    })

    static postDeleteCity = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const city = await CityModel.getByColumns({id: id})

        city.delete();

        res.json(`Cidade de ID ${id} deletada com sucesso`)
    })

}

module.exports = CityController