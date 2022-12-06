const Controller = require("../Controller");

const ConstrucitonModel = require('../../models/ConstructionModel');
const UserBuilderModel = require("../../models/UserModel");
const UserAdministratorModel = require("../../models/AdministratorModel");
const APIError = require("../../services/ErrorService");
const TagModel = require("../../models/TagModel");


class WebDashboardController {
    static getHome = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('dashboard/Componentes/page', {
            title: 'Home',
            css: '/dashboard/Home/Home.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Home/Home',
            secondAside: null,
            currentPage: req.url
        });
    })

    static getConstructions = (req, res) => Controller.execute(req, res, async (req, res) => {
        const constructions = await ConstrucitonModel.allByColumns();

        res.render('dashboard/Componentes/page', {
            title: 'Obras',
            css: '/dashboard/Obras/Obras.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Obras/Obras',
            secondAside: __dirname + '/../../../Frontend/Dashboard/Componentes/FilterAside',
            currentPage: req.url,
            constructions: constructions
        });
    })

    static getCreateObras = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('dashboard/Cadastro/pages', {
            erro: {},
            title: 'Criação de obra',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Obra/Obra',
            css: '/dashboard/Obra/Obra.css',
            secondAside: {},
            currentPage: req.url
        });
    })

    static postCreateObras = (req, res) => Controller.execute(req, res, async (req, res) => {
        const { name, description } = req.body;

        const error = {};

        if (name.length < 5) {
            error.name = "Nome muito pequeno"
        }

        if (description.length < 10) {
            error.description = "Descrição muito pequena"
        }

        //if(cidade.length > 1){
        //    error.cidade = "Coloque o id da cidade"
        //}

        if (Object.keys(error).lenght) {
            res.render('dashboard/Cadastro/pages', {
                error: error,
                title: 'Criação de obra',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Obra/Obra',
                css: '/dashboard/Obra/Obra.css',
                secondAside: {},
                currentPage: req.url
            });
            console.log(error)
        } else {

            const createObras = new ConstrucitonModel({
                name: req.body.name,
                description: req.body.description,
                city_id: req.body.city_id
            });
            await createObras.insert()
            res.redirect('/dashboard/obras')

        }
    })

    static getCriarUsuario = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('dashboard/Cadastro/pages', {
            error: {},
            title: 'Criar Usuário',
            css: '/dashboard/Cadastro/Usuario/Usuario.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Cadastro/Usuario/Usuario',
            currentPage: req.url,
            secondAside: {},
        });
    })

    static postCriarUsuario = (req, res) => Controller.execute(req, res, async (req, res) => {
        const { password, email, razaoSocial, cnpj, numFuncionarios, telEmpresa, nomeDono, cpfDono, telDono, emailContador, telContador } = req.body;

        const error = {};

        if (password.length < 8) {
            error.password = 'Senha precisa ter mais de 8 caracteres';
        }

        if (!email.includes('@')) {
            error.email = 'Email precisa estar corretamente formatado';
        }

        if (razaoSocial.length === 0) {
            error.razaoSocial = "Digite a Razão Social"
        }

        if (cnpj.length < 18) {
            error.cnpj = "Cnpj inválido"
        }

        if (numFuncionarios.length === 0) {
            error.numFuncionarios = "Digite o número de funcionários"
        }

        if (telEmpresa.length < 16 || telEmpresa.length > 16) {
            error.telEmpresa = "Telefone inválido"
        }

        if (nomeDono.length < 6) {
            error.nomeDono = "Digite o nome do dono"
        }

        if (cpfDono.length < 14) {
            error.cnpj = "Cpf inválido"
        }

        if (telDono.length < 16 || telDono.length > 16) {
            error.telDono = "Telefone inválido"
        }


        if (!emailContador.includes('@')) {
            error.emailContador = "Digite um email válido"
        }

        if (telContador.length < 16 || telContador.length > 16) {
            error.cnpj = "Telefone inválido"
        }


        if (Object.keys(error).length) {
            res.render('dashboard/Cadastro/pages', {
                error: error,
                title: 'Criar Usuário',
                conteudo: __dirname + '../../../../Frontend/Dashboard/Cadastro/Usuario/Usuario',
                css: '/dashboard/Cadastro/Usuario/Usuario.css',
                currentPage: req.url,
                secondAside: {},
            });
        } else {
            const createBuilder = new UserBuilderModel({
                name: req.body.razaoSocial,
                email: req.body.email,
                password: req.body.password,
                cellphone: req.body.telEmpresa,
                cnpj: req.body.cnpj,
                employees_number: req.body.numFuncionarios,
                owner_name: req.body.nomeDono,
                owner_cellphone: req.body.telDono,
                owner_cpf: req.body.cpfDono,
                owner_birth_date: '22323334',
            });
            await createBuilder.insert()
            res.redirect('/dashboard/usuarios');
        }
    })

    static getUsers = (req, res) => Controller.execute(req, res, async (req, res) => {
        const users = await UserBuilderModel.allByColumns();

        res.render('dashboard/Componentes/page', {
            title: 'Usuários',
            css: '/dashboard/Usuarios/Usuarios.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Usuarios/Usuarios',
            secondAside: __dirname + '/../../../Frontend/Dashboard/Componentes/FilterAside',
            currentPage: req.url,
            users: users
        });
    })


    static deleteUser = (req, res) => Controller.execute(req, res, async (req, res) => {
        const user = await UserBuilderModel.getByColumns({ id: req.params.id })

        await user.delete();

        res.redirect("/dashboard/usuarios");
    })

    static getCriarAdm = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('dashboard/Cadastro/pages', {
            error: {},
            title: 'Criar Administrador',
            css: '/dashboard/Cadastro/Administrador/Administrador.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Cadastro/Administrador/Administrador',
            currentPage: req.url,
        });
    })

    static postCriarAdm = (req, res) => Controller.execute(req, res, async (req, res) => {
        const { email, name } = req.body;

        const error = {};

        if (!email.includes('@')) {
            error.email = "Digite um email válido"
        }

        if (name.length <= 5) {
            error.name = "Nome inválido"
        }

        if (Object.keys(error).length) {
            res.render('dashboard/Cadastro/pages', {
                error: error,
                title: 'Criar Administrador',
                css: '/dashboard/Cadastro/Administrador/Administrador.css',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Cadastro/Administrador/Administrador',
                currentPage: req.url
            });
        } else {
            const createBuilder = new UserAdministratorModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            await createBuilder.insert()
            res.redirect('/dashboard/administradores/');
        }
    })

    static getAdministrators = (req, res) => Controller.execute(req, res, async (req, res) => {
        const administrators = await UserAdministratorModel.allByColumns();

        res.render('dashboard/Componentes/page', {
            title: 'Usuários',
            css: '/dashboard/Administradores/Administradores.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Administradores/Administradores',
            secondAside: __dirname + '/../../../Frontend/Dashboard/Componentes/FilterAside',
            currentPage: req.url,
            administrators: administrators
        });
    })



    static deleteAdministrator = (req, res) => Controller.execute(req, res, async (req, res) => {
        const user = await UserAdministratorModel.getByColumns({ id: req.params.id })

        await user.delete();

        res.redirect("/dashboard/administradores");
    })

    static getAdministrator = (req, res) => Controller.execute(req, res, async (req, res) => {
        try {
            const administrator = await UserAdministratorModel.getByColumns({
                id: req.params.id
            });


            res.render('dashboard/Componentes/page', {
                title: administrator.name,
                css: '/dashboard/Administrador/Administrador.css',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Administrador/Administrador',
                secondAside: '',
                currentPage: req.url,
                administrator: administrator
            });
        } catch (error) {
            if (error instanceof APIError && error.status == 404) {
                res.redirect("/dashboard/administradores")
            } else {
                throw error;
            }
        }
    })

    static getUpdateAdministrator = (req, res) => Controller.execute(req, res, async (req, res) => {
        try {
            const administrator = await UserAdministratorModel.getByColumns({
                id: req.params.id
            });


            res.render('dashboard/Componentes/page', {
                title: administrator.name,
                css: '/dashboard/Administrador/Administrador.css',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Administrador/Administrador',
                secondAside: '',
                currentPage: req.url,
                administrator: administrator
            });
        } catch (error) {
            if (error instanceof APIError && error.status == 404) {
                res.redirect("/dashboard/administradores")
            } else {
                throw error;
            }
        }
    })

    static postUpdateAdministrator = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const administrator = await UserAdministratorModel.getByColumns({ id: id })

        administrator.setName(req.body.name);
        administrator.setEmail(req.body.email);

        administrator.update();

        res.redirect('/dashboard/administradores')
    })

    static getUser = (req, res) => Controller.execute(req, res, async (req, res) => {
        try {
            const user = await UserBuilderModel.getByColumns({
                id: req.params.id
            });

            res.render('dashboard/Componentes/page', {
                title: user.name,
                css: '/dashboard/Usuario/Usuario.css',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Usuario/Usuario',
                secondAside: '',
                currentPage: 's',
                user: user

            });


        } catch (error) {
            if (error instanceof APIError && error.status == 404) {
                res.redirect("/dashboard/usuarios")
            } else {
                throw error;
            }
        }
    })

    static getUpdateUser = (req, res) => Controller.execute(req, res, async (req, res) => {
        try {
            const user = await UserBuilderModel.getByColumns({
                id: req.params.id
            });

            res.render('dashboard/Componentes/page', {
                title: user.name,
                css: '/dashboard/Usuario/Usuario.css',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Usuario/Usuario',
                secondAside: '',
                currentPage: req.url,
                user: user

            });
        } catch (error) {
            if (error instanceof APIError && error.status == 404) {
                res.redirect("/dashboard/usuarios")
            } else {
                throw error;
            }
        }
    })


    static postUpdateUser = (req, res) => Controller.execute(req, res, async (req, res) => {
        const id = req.params.id;
        const user = await UserBuilderModel.getByColumns({ id: id })

        user.setName(req.body.razaoSocial);
        user.setEmail(req.body.email);
        user.setCellphone(req.body.telEmpresa);
        user.setCnpj(req.body.cnpj);
        user.setEmployeesNumber(req.body.numFuncionarios);
        user.setOwnerName(req.body.nomeDono);
        user.setOwnerCellphone(req.body.telDono);
        user.setOwnerCpf(req.body.cpfDono);

        user.update();

        res.redirect('/dashboard/usuarios')

    })

    static getConstruction = (req, res) => Controller.execute(req, res, async (req, res) => {
        try {
            const construction = await ConstrucitonModel.getByColumns({ id: req.params.id });

            res.render('dashboard/Componentes/page', {
                title: 'Usuários',
                css: '/dashboard/Obra/Obra.css',
                conteudo: __dirname + '/../../../Frontend/Dashboard/Obra/Obra',
                secondAside: '',
                currentPage: req.url,
                construction: construction
            });
        } catch (error) {
            if (error instanceof APIError && error.status == 404) {
                res.redirect("/dashboard/obras")
            } else {
                throw error;
            }
        }
    })

    static deleteConstruction = (req, res) => Controller.execute(req, res, async (req, res) => {
        const construciton = await ConstrucitonModel.getByColumns({ id: req.params.id })

        await construciton.delete();

        res.redirect("/dashboard/obras");
    })

    static postCreateTag = (req, res) =>  Controller.execute(req, res, async (req, res) => {
        const tag = new TagModel({name: req.body.name});
        await tag.insert();

        res.redirect("/dashboard/tags");
    })

    static getListAllTags = (req, res) =>  Controller.execute(req, res, async (req, res) => {
        let tags = [];
        try {
            tags = await TagModel.allByColumns();
        } catch (error) {
            if(error instanceof APIError && error.status == 404){
                tags = [];
            }else {
                console.log(error);
                return res.redirect("/dashboard")
            }
        }

        res.render('dashboard/Componentes/page', {
            title: 'Tags',
            css: '/dashboard/Tags/Tags.css',
            conteudo: __dirname + '/../../../Frontend/Dashboard/Tags/Tags',
            secondAside: '',
            currentPage: req.url,
            tags: tags
        });
    })

    static getDeleteTag = (req, res) =>  Controller.execute(req, res, async (req, res) => {
        const tag = await TagModel.getByColumns({id: req.params.id});
        tag.delete();
        res.redirect("/dashboard/tags");
    })

    static postUpdateTag = (req, res) =>  Controller.execute(req, res, async (req, res) => {
        const tag = await TagModel.getByColumns({id: req.params.id});
        tag.setName(req.body.name);
        tag.update();

        res.redirect("/dashboard/tags");
    })
}

module.exports = WebDashboardController;