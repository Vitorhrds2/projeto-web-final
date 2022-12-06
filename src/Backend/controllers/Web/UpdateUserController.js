const Controller = require("../Controller");

const ConstrucitonModel = require('../../models/ConstructionModel');

class WebUpdateUserController {

    static getEdicaoUsuarioEmpresa = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('Main/EdicaoUsuario/EdicaoEmpresa');
    })

    static postEdicaoUsuarioEmpresa = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('Main/EdicaoUsuario/EdicaoEmpresa');
    })

    static getEdicaoUsuarioDono = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('Main/EdicaoUsuario/EdicaoDono');
    })

    static postEdicaoUsuarioDono = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('Main/EdicaoUsuario/EdicaoDono');
    })

    static getEdicaoUsuarioContador = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('Main/EdicaoUsuario/EdicaoContador'   );
    })

    static postEdicaoUsuarioContador = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('Main/EdicaoUsuario/EdicaoContador'   );
    })
    
}

module.exports = WebUpdateUserController;