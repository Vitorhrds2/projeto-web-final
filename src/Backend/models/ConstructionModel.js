const APIError = require("../services/ErrorService");
const Model = require("./Model");

class ConstructionModel extends Model {
    id;
    name;
    description;
    city_id;
    creation_date;
    update_date;

    constructor(constructionInfo) {
        super({ 'tableName': 'cmrv_construction', 'identifierColumns': ['id'] })

        if(constructionInfo.id){
            this.setConstruction(constructionInfo)
        }else{
            this.setNewConstruction(constructionInfo)
        }
    }

    setConstruction(constructionInfo){
        this.setId(constructionInfo.id);
        this.setName(constructionInfo.name);
        this.setDescription(constructionInfo.description);
        this.setCityId(constructionInfo.city_id);
        this.setCreationDate(constructionInfo.creation_date);
        this.setUpdateDate(constructionInfo.update_date);
    }

    setNewConstruction(constructionInfo){
        this.setName(constructionInfo.name);
        this.setDescription(constructionInfo.description);
        this.setCityId(constructionInfo.city_id);
    }

    // SETTERS
    setId(id){
        if(!id) {
            throw new APIError("Construção precisa de um ID", 403);
        }

        this.id = id;
    }

    setName(name){
        if(name && name.length <= 5) {
            throw new APIError("Nome precisa ter mais que 5 caracteres", 403);
        }

        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setCityId(city_id){
        this.city_id = city_id;
    }

    setCreationDate(creation_date){
        this.creation_date = creation_date;
    }

    setUpdateDate(update_date){
        this.update_date = update_date;
    }


    // Retorna uma obra com base nas colunas passadas por parâmetro
    static async getByColumns(params){
        const rowInfo = await this.getSQL(
            `SELECT * 
            FROM cmrv_construction
            WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new ConstructionModel(rowInfo)
        }else{
            throw new APIError("Obra não encontrada", 404);
        }
    }

    // Retorna obras com base nas colunas passadas por parâmetro
    static async allByColumns(params = []){
        const rows = await this.allSQL(
            `SELECT * 
            FROM cmrv_construction
            ${params.length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new ConstructionModel(rowInfo).getObject())
        }else{
            throw new APIError("Obra não encontrada", 404);
        }
    }

}

module.exports = ConstructionModel;