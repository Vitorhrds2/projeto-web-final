const APIError = require("../services/ErrorService");
const Model = require("./Model");

class UserConstructionSummary extends Model {
    id;
    name;
    description;
    is_with_mrv;
    user_builder_id;

    constructor(userConstructionSummaryInfo) {
        super({ 'tableName': 'cmrv_builder_construction_summary', 'identifierColumns': ['id'] })

        if(userConstructionSummaryInfo.id){
            this.setUserConstructionSummary(userConstructionSummaryInfo)
        }else{
            this.setNewUserConstructionSummary(userConstructionSummaryInfo)
        }
    }

    setUserConstructionSummary(userConstructionSummaryInfo){
        this.setId(userConstructionSummaryInfo.id);
        this.setName(userConstructionSummaryInfo.name);
        this.setDescription(userConstructionSummaryInfo.description);
        this.setIsWithMrv(userConstructionSummaryInfo.is_with_mrv);
        this.setUserBuilderId(userConstructionSummaryInfo.user_builder_id);
    }

    setNewUserConstructionSummary(userConstructionSummaryInfo){
        this.setName(userConstructionSummaryInfo.name);
        this.setDescription(userConstructionSummaryInfo.description);
        this.setIsWithMrv(userConstructionSummaryInfo.is_with_mrv);
        this.setUserBuilderId(userConstructionSummaryInfo.user_builder_id);
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

    setIsWithMrv(is_with_mrv){
        this.is_with_mrv = !!is_with_mrv;
    }

    setUserBuilderId(user_builder_id){
        this.user_builder_id = user_builder_id;
    }


    // Retorna uma obra com base nas colunas passadas por parâmetro
    static async getByColumns(params){
        const rowInfo = await this.getSQL(
            `SELECT * 
            FROM cmrv_builder_construction_summary
            WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new UserConstructionSummary(rowInfo)
        }else{
            throw new APIError("Obra não encontrada", 404);
        }
    }

    // Retorna obras com base nas colunas passadas por parâmetro
    static async allByColumns(params = []){
        const rows = await this.allSQL(
            `SELECT * 
            FROM cmrv_builder_construction_summary
            ${params.length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new UserConstructionSummary(rowInfo).getObject())
        }else{
            throw new APIError("Obra não encontrada", 404);
        }
    }

}

module.exports = UserConstructionSummary;