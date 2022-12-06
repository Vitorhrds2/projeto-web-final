const Controller = require("../Controller");

const UserBuilderModel = require('../../models/UserModel');

var data = new Object();

class WebCreateUserController {
    static getCadastroEtapa1 = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('main/Cadastro/Componentes/RegisterPage', {
            error: {},
            title: 'Etapa 1',
            conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa1'});
    })

    static postCadastroEtapa1 = (req, res) => Controller.execute(req, res, async (req, res) => {
        const {password, email} = req.body;

        const error = {};

        if(password.length < 8) {
            error.password = 'Senha precisa ter mais de 8 caracteres';
        }

        if(!email.includes('@')){
            error.email = 'Email precisa estar corretamente formatado';
        }
        console.log('erro:', error)
        if(Object.keys(error).length){
            res.render('main/Cadastro/Componentes/RegisterPage', {
                error: error,
                title: 'Etapa 1',
                conteudo:__dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa1'});
        }else{
                data.email = req.body.email;
                data.password = req.body.password;
            res.redirect('/cadastro/etapa2');
        }
    })

    static getCadastroEtapa2 = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('main/Cadastro/Componentes/RegisterPage', {
            error: {},
            title: 'Etapa 2',
            conteudo:__dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa2'});
    })
    
    static postCadastroEtapa2 = (req, res) => Controller.execute(req, res, async (req, res) => {
        const {razaoSocial, cnpj} = req.body;

        const error = {};

        if(razaoSocial.length === 0){
            error.razaoSocial = "Digite a Razão Social"
        }

        if(cnpj.length < 18){
            error.cnpj = "Cnpj inválido"
        }
        console.log(error)
        if(Object.keys(error).length){
            res.render('main/Cadastro/Componentes/RegisterPage', {
                error: error,
                title:'Etapa 2',
                conteudo:__dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa2'});
        }else{
            data.razaoSocial = req.body.razaoSocial;
            data.cnpj = req.body.razaoSocial;
            res.redirect('/cadastro/etapa3')            
        }
    })

    static getCadastroEtapa3 = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('main/Cadastro/Componentes/RegisterPage', {
            error: {},
            title: 'Etapa 3',
            conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa3'});
    })

    static postCadastroEtapa3 = (req, res) => Controller.execute(req, res, async (req, res) => {
        const {numFuncionarios, telEmpresa} = req.body;

        const error = {};

        if(numFuncionarios.length === 0){
            error.numFuncionarios = "Digite o número de funcionários"
        }

        if(telEmpresa.length < 16 || telEmpresa.length > 16){
            error.telEmpresa = "Telefone inválido"
        }
        
        if(Object.keys(error).length){
            res.render('main/Cadastro/Componentes/RegisterPage', {
                error: error,
                title: 'Etapa 3',
                conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa3'});
        }else{
            data.numFuncionarios = req.body.numFuncionarios;
            data.telEmpresa = req.body.telEmpresa;
            res.redirect('/cadastro/etapa4');
        }
    })

    static getCadastroEtapa4 = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('main/Cadastro/Componentes/RegisterPage', {
            error: {},
            title: 'Etapa 4',
            conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa4'});
    })

    static postCadastroEtapa4 = (req, res) => Controller.execute(req, res, async (req, res) => {
        const {nomeDono, cpfDono, telDono} = req.body;

        const error = {};

        if( nomeDono.length < 6){
            error.nomeDono = "Digite o nome do dono"
        }

        if(cpfDono.length < 14){
            error.cnpj = "Cpf inválido"
        }

        if(telDono.length < 16 || telDono.length > 16){
            error.telDono = "Telefone inválido"
        }

        console.log(error)
        if(Object.keys(error).length){
            res.render('main/Cadastro/Componentes/RegisterPage', {
                error: error,
                title: 'Etapa 4',
                conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa4'});
        }else{
            data.nomeDono = req.body.nomeDono;
            data.cpfDono = req.body.cpfDono;
            data.telDono = req.body.telDono;
            res.redirect('/cadastro/etapa5');
        }
    })

    static getCadastroEtapa5 = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('main/Cadastro/Componentes/RegisterPage', {
            error: {},
            title: 'Etapa 5',
            conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa5'});
    })

    static postCadastroEtapa5 = (req, res) => Controller.execute(req, res, async (req, res) => {
        const {emailContador, telContador} = req.body;

        const error = {};

        if(!emailContador.includes('@')){
            error.emailContador = "Digite um email válido"
        }

        if(telContador.length < 16 || telContador.length > 16){
            error.cnpj = "Telefone inválido"
        }

        if(Object.keys(error).length){
            res.render('main/Cadastro/Componentes/RegisterPage', {
                error: error,
                title: 'Etapa 5',
                conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa5'});
                console.log("oi")
        }else{
            data.emailContador = req.body.emailContador;
            data.telContador = req.body.telContador;
            res.redirect('/cadastro/etapa6');
        }
    })

    static getCadastroEtapa6 = (req, res) => Controller.execute(req, res, async (req, res) => {
        res.render('main/Cadastro/Componentes/RegisterPage', {
            error: {},
            title: 'Etapa 6',
            conteudo: __dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa6'});
    })

    static postCadastroEtapa6 = (req, res) => Controller.execute(req, res, async (req, res) => {
        const {img} = req.body;

        const error = {};


        if(Object.keys(error).length){
            res.render('main/Cadastro/Componentes/RegisterPage',{
                error: error,
                title: 'Etapa 6',
                conteudo:__dirname + '../../../../Frontend/Main/Cadastro/CadastroEtapa6'});
        }
        else{
            
            const createBuilder = new UserBuilderModel({
                name: data.razaoSocial,
                email: data.email,
                cellphone: data.telEmpresa,
                cnpj: data.cnpj,
                employees_number: data.numFuncionarios,
                password: data.password,
                owner_name: data.nomeDono,
                owner_cellphone: data.telDono,
                owner_cpf: data.cpfDono,
                owner_birth_date: '22323334',
            });
            res.redirect('/home');
            await createBuilder.insert()
            console.log(createBuilder)
        }
        })
}

module.exports = WebCreateUserController;