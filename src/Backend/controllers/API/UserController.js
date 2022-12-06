const UserBuilderModel = require('../../models/UserModel')
const AuthService = require('../../services/AuthService')
const APIError = require('../../services/ErrorService')
const Controller = require('../Controller')

class UserBuilderController extends Controller {
    // CREATE
    static getCreateUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.send("pagina")
    })

    static postCreateUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        const user = new UserBuilderModel({
            'name': req.body.name,
            'email': req.body.email,
            'cellphone': req.body.cellphone,
            'cnpj': req.body.cnpj,
            'employees_number': req.body.employees_number,
            'password': req.body.password,
            'owner_name': req.body.owner_name,
            'owner_cellphone': req.body.owner_cellphone,
            'owner_cpf': req.body.owner_cpf,
            'owner_birth_date': req.body.owner_birth_date
        });

        await user.insert()

        res.json({
            token: AuthService.makeToken(user.id)
        })
    })

    // READ
    static getUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id
        const user = await UserBuilderModel.getByColumns({ id: id })
        res.json(user.getObject())
    })

    static getAllUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        const users = await UserBuilderModel.allByColumns()
        res.json(users)
    })

    static postLogin = (req, res) => Controller.execute(req, res, async (req, res) => {
        try {
            const user = await UserBuilderModel.getByColumns({email: req.body.email});

            user.validatePassword(req.body.password);
    
            res.json({token: AuthService.makeToken(user.id)});
        } catch (error) {
            if(error instanceof APIError){
                throw new APIError("Credenciais incorretas", 403)
            }else{
                throw error;
            }
        }
    })


    // UPDATE
    static getUpdateUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.json("oi")
    })

    static postUpdateUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;

        const user = await UserBuilderModel.getByColumns({ id: id });

        user.setName(req.body.name);
        user.setEmail(req.body.email);
        user.setCellphone(req.body.cellphone);
        user.setCnpj(req.body.cnpj);
        user.setEmployeesNumber(req.body.employees_number);
        user.setOwnerName(req.body.owner_name);
        user.setOwnerCellphone(req.body.owner_cellphone);
        user.setOwnerCpf(req.body.owner_cpf);
        user.setOwnerBirthDate(req.body.owner_birth_date);

        user.update()

        res.json(user.getObject())
    })

    // DELETE
    static getDeleteUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        
    })

    static postDeleteUserBuilder = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        
        const user = await UserBuilderModel.getByColumns({id: id});

        await user.delete();

        res.json({"message": `Usuário de ID ${id} deletado`})
    })
}

module.exports = UserBuilderController;