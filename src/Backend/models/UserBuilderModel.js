const Model = require('./Model')
const crypto = require('crypto');

const APIError = require('../services/ErrorService')

class UserBuilderModel extends Model {
    id;
    name;
    email;
    cellphone;
    cnpj;
    employees_number;
    password_hash;
    password_salt;
    owner_name;
    owner_cellphone;
    owner_cpf;
    owner_birth_date;
    creation_date;
    update_date;
    avatar_image_id;

    constructor(builderInfo) {
        super({ 'tableName': 'cmrv_user_builder', 'identifierColumns': ['id'] })

        if (builderInfo.id) {
            this.setUserBuilder(builderInfo)
        } else {
            this.setNewUserBuilder(builderInfo)
        }
    }

    // Preenche as informações do objeto esperando que o objeto já foi instanciado corretamenta
    setUserBuilder(userBuilderInfo) {
        this.setId(userBuilderInfo.id)
        this.setName(userBuilderInfo.name)
        this.setEmail(userBuilderInfo.email)
        this.setCellphone(userBuilderInfo.cellphone)
        this.setCnpj(userBuilderInfo.cnpj)
        this.setEmployeesNumber(userBuilderInfo.employees_number)
        this.setPasswordHash(userBuilderInfo.password_hash)
        this.setPasswordSalt(userBuilderInfo.password_salt)
        this.setOwnerName(userBuilderInfo.owner_name)
        this.setOwnerCellphone(userBuilderInfo.owner_cellphone)
        this.setOwnerCpf(userBuilderInfo.owner_cpf)
        this.setOwnerBirthDate(userBuilderInfo.owner_birth_date)
        this.setCreationDate(userBuilderInfo.creation_date)
        this.setUpdateDate(userBuilderInfo.update_date)
        this.setAvatarImageId(userBuilderInfo.avatar_image_id)
    }

    // Preenche as informações do objeto de forma a preparar para a criação de um registro
    setNewUserBuilder(userBuilderInfo) {
        this.setName(userBuilderInfo.name)
        this.setEmail(userBuilderInfo.email)
        this.setCellphone(userBuilderInfo.cellphone)
        this.setCnpj(userBuilderInfo.cnpj)
        this.setEmployeesNumber(userBuilderInfo.employees_number)
        this.setPassword(userBuilderInfo.password)
        this.setOwnerName(userBuilderInfo.owner_name)
        this.setOwnerCellphone(userBuilderInfo.owner_cellphone)
        this.setOwnerCpf(userBuilderInfo.owner_cpf)
        this.setOwnerBirthDate(userBuilderInfo.owner_birth_date)
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

    setCellphone(cellphone) {
        this.cellphone = cellphone;
    }

    setCnpj(cnpj) {
        this.cnpj = cnpj;
    }

    setEmployeesNumber(employees_number) {
        this.employees_number = employees_number;
    }

    setPasswordHash(password_hash) {
        this.password_hash = password_hash;
    }

    setPasswordSalt(password_salt) {
        this.password_salt = password_salt;
    }

    setOwnerName(owner_name) {
        this.owner_name = owner_name;
    }

    setOwnerCellphone(owner_cellphone) {
        this.owner_cellphone = owner_cellphone;
    }

    setOwnerCpf(owner_cpf) {
        this.owner_cpf = owner_cpf;
    }

    setOwnerBirthDate(owner_birth_date) {
        this.owner_birth_date = owner_birth_date;
    }

    setCreationDate(creation_date) {
        this.creation_date = creation_date;
    }

    setUpdateDate(update_date) {
        this.update_date = update_date;
    }
    
    setAvatarImageId(avatar_image_id) {
        this.avatar_image_id = avatar_image_id;
    }

    // Retorna um usuário com base nas colunas passadas por parâmetro
    static async getByColumns(params) {
        const rowInfo = await this.getSQL(
            `SELECT * 
            FROM cmrv_user_builder
            WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}`,
            params
        )

        if (rowInfo) {
            return new UserBuilderModel(rowInfo)
        } else {
            throw new APIError("Empreiteiro não encontrado", 404);
        }
    }

    // Retorna usuários com base nas colunas passadas por parâmetro
    static async allByColumns(params = []) {
        const rows = await this.allSQL(
            `SELECT * 
            FROM cmrv_user_builder
            ${params.length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if (rows.length) {
            return rows.map(rowInfo => new UserBuilderModel(rowInfo).getObject())
        } else {
            throw new APIError("Empreiteiros não encontrados", 404);
        }
    }
}

module.exports = UserBuilderModel