const Model = require('./Model')
const crypto = require('crypto');

const APIError = require('../services/ErrorService')

class UserAdministratorModel extends Model {
    id;
    name;
    email;
    password_hash;
    password_salt;
    creation_date;
    update_date;

    constructor(builderInfo) {
        super({ 'tableName': 'cmrv_user_administrator', 'identifierColumns': ['id'] })

        if (builderInfo.id) {
            this.setUserAdministrator(builderInfo)
        } else {
            this.setNewUserAdministrator(builderInfo)
        }
    }

    // Preenche as informações do objeto esperando que o objeto já foi instanciado corretamenta
    setUserAdministrator(UserAdministratorInfo) {
        this.setId(UserAdministratorInfo.id)
        this.setName(UserAdministratorInfo.name)
        this.setEmail(UserAdministratorInfo.email)
        this.setPasswordHash(UserAdministratorInfo.password_hash)
        this.setPasswordSalt(UserAdministratorInfo.password_salt)
        this.setCreationDate(UserAdministratorInfo.creation_date)
        this.setUpdateDate(UserAdministratorInfo.update_date)
    }

    // Preenche as informações do objeto de forma a preparar para a criação de um registro
    setNewUserAdministrator(UserAdministratorInfo) {
        this.setName(UserAdministratorInfo.name)
        this.setEmail(UserAdministratorInfo.email)
        this.setPassword(UserAdministratorInfo.password)
        this.setCreationDate(UserAdministratorInfo.creation_date)
        this.setUpdateDate(UserAdministratorInfo.update_date)
    }

    // Seta a senha criptografada e o salt com base em uma senha passada por parâmetro
    setPassword(password) {
        if (String(password).length >= 8) {
            this.password_salt = crypto.randomBytes(10).toString(`hex`);

            this.password_hash = crypto.pbkdf2Sync(password, this.password_salt, 1000, 64, 'sha1').toString(`hex`);
        } else {
            throw new Error("Senha precisa ter 8 carecteres ou mais")
        }
    }

    // Verifica se a senha está correta
    validatePassword(password) {
        if(this.password_hash != crypto.pbkdf2Sync(password, this.password_salt, 1000, 64, 'sha1').toString(`hex`)){
            throw new APIError("Senha Incorreta", 403);
        }
    }

    // SETTERS
    setId(id) {
        if(!id){
            throw new APIError("Usuário precisa de um ID", 403);
        }

        this.id = id;
    }

    setName(name) {
        if(name && name.length < 7){
            throw new APIError("Nome precisa estar completo", 403);
        }
        this.name = name;
    }

    setEmail(email) {
        if(email && email.length < 7){
            throw new APIError("Email precisa ser válido", 403);
        }
        this.email = email;
    }

    setPasswordHash(password_hash) {
        this.password_hash = password_hash;
    }

    setPasswordSalt(password_salt) {
        this.password_salt = password_salt;
    }

    setCreationDate(creation_date) {
        this.creation_date = creation_date;
    }

    setUpdateDate(update_date) {
        this.update_date = update_date;
    }

    // Retorna um usuário com base nas colunas passadas por parâmetro
    static async getByColumns(params) {
        const rowInfo = await this.getSQL(
            `SELECT * 
            FROM cmrv_user_administrator
            WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}`,
            params
        )

        if (rowInfo) {
            return new UserAdministratorModel(rowInfo)
        } else {
            throw new APIError("Usuario não encontrado", 404);
        }
    }

    // Retorna usuários com base nas colunas passadas por parâmetro
    static async allByColumns(params = []) {
        const rows = await this.allSQL(
            `SELECT * 
            FROM cmrv_user_administrator
            ${params.length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if (rows.length) {
            return rows.map(rowInfo => new UserAdministratorModel(rowInfo).getObject())
        } else {
            throw new APIError("Usuarios não encontrados", 404);
        }
    }
}

module.exports = UserAdministratorModel