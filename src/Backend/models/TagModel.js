const APIError = require("../services/ErrorService");
const Model = require("./Model");

class TagModel extends Model {
    id;
    name;

    constructor(tagInfo) {
        super({ 'tableName': 'cmrv_tag', 'identifierColumns': ['id'] })

        if(tagInfo.id){
            this.setTag(tagInfo)
        }else{
            this.setNewTag(tagInfo)
        }
    }

    setTag(tagInfo){
        this.setId(tagInfo.id);
        this.setName(tagInfo.name);
    }

    setNewTag(tagInfo){
        this.setName(tagInfo.name);
    }

    // SETTERS
    setId(id){
        if(!id) {
            throw new APIError("Construção precisa de um ID", 403);
        }

        this.id = id;
    }

    setName(name){
        if(name && name.length < 1) {
            throw new APIError("Nome precisa ter pelo menos um caractere", 403);
        }

        this.name = name;
    }


    // Retorna uma tag com base nas colunas passadas por parâmetro
    static async getByColumns(params){
        const rowInfo = await this.getSQL(
            `SELECT * 
            FROM cmrv_tag
            WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new TagModel(rowInfo)
        }else{
            throw new APIError("Tag não encontrada", 404);
        }
    }

    // Retorna tags com base nas colunas passadas por parâmetro
    static async allByColumns(params = []){
        const rows = await this.allSQL(
            `SELECT * 
            FROM cmrv_tag
            ${params.length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new TagModel(rowInfo).getObject())
        }else{
            throw new APIError("Tag não encontrada", 404);
        }
    }

}

module.exports = TagModel;