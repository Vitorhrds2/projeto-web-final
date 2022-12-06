const APIError = require("../services/ErrorService");
const Model = require("./Model");

class ConstructionBuilderInterestModel extends Model {
    construction_id;
    builder_id;
    creation_date;

    constructor(constructionBuilderInterest) {
        super({ 'tableName': 'cmrv_construction_builder_interest', 'identifierColumns': ['construction_id', 'builder_id'], 'codeColumns': ['builder', 'construction'] })

        this.setConstructionBuilderInterest(constructionBuilderInterest)
    }

    setConstructionBuilderInterest(constructionBuilderInterest){
        this.setConstructionId(constructionBuilderInterest.construction_id);
        this.setBuilderId(constructionBuilderInterest.builder_id);
        this.setCreationDate(constructionBuilderInterest.creation_date);

        this.setConstruction(constructionBuilderInterest);
        this.setBuilder(constructionBuilderInterest);
    }

    // SETTERS
    setConstructionId(construction_id){
        this.construction_id = construction_id;
    }

    setConstruction(constructionInfo){
        this.construction = {
            id: constructionInfo.construction_id,
            name: constructionInfo.construction_name,
            description: constructionInfo.construction_description
        }
    }

    setBuilderId(builder_id){
        this.builder_id = builder_id;
    }

    setBuilder(builderInfo){
        this.builder = {
            id: builderInfo.builder_id,
            name: builderInfo.builder_name,
            email: builderInfo.builder_email
        }
    }

    setCreationDate(creation_date){
        this.creation_date = creation_date;
    }

    // Retorna uma obra com base nas colunas passadas por parâmetro
    static async getByColumns(params = {}, joins = {}){
        const rowInfo = await this.getSQL(
            `SELECT cmrv_construction_builder_interest.*
                ${joins.construction ? `,
                    cmrv_construction.id AS construction_id,
                    cmrv_construction.name AS construction_name,
                    cmrv_construction.description AS construction_description
                ` : ``}
                ${joins.builder ? `,
                    cmrv_user_builder.id AS builder_id,
                    cmrv_user_builder.name AS builder_name,
                    cmrv_user_builder.email AS builder_email
                ` : ``} 
            FROM cmrv_construction_builder_interest
                ${joins.construction ? `
                    INNER JOIN cmrv_construction ON cmrv_construction.id = cmrv_construction_builder_interest.construction_id
                    ` : ``}
                ${joins.builder ? `
                    INNER JOIN cmrv_user_builder ON cmrv_user_builder.id = cmrv_construction_builder_interest.builder_id
                ` : ``} 
            WHERE ${Object.keys(params).map(key => `cmrv_construction_builder_interest.${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new ConstructionBuilderInterestModel(rowInfo)
        }else{
            throw new APIError("Interesse em obra não encontrado", 404);
        }
    }

    // Retorna obras com base nas colunas passadas por parâmetro
    static async allByColumns(params = {}){
        const rows = await this.allSQL(
            `SELECT cmrv_construction_builder_interest.* 
            FROM cmrv_construction_builder_interest
            ${Object.keys(params).length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new ConstructionBuilderInterestModel(rowInfo).getObject())
        }else{
            throw new APIError("Interesse em obra não encontrado", 404);
        }
    }

}

module.exports = ConstructionBuilderInterestModel;