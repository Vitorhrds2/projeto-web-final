const APIError = require("../services/ErrorService");
const Model = require("./Model");

class StateModel extends Model {
    id;
    name;
    uf;
    capital_city_id;
    capital_city;

    constructor(stateInfo) {
        super({ 'tableName': 'ibge_state', 'identifierColumns': ['id'], 'codeColumns': ['state']})

        if(stateInfo.id){
            this.setState(stateInfo)
        }else{
            this.setNewState(stateInfo)
        }
    }

    setState(stateInfo){
        this.setId(stateInfo.id);
        this.setName(stateInfo.name);
        this.setUf(stateInfo.uf);
        this.setCapitalCityId(stateInfo.capital_city_id);

        if(stateInfo.city_id && stateInfo.city_name){
            this.setCapitalCity(stateInfo)
        }
    }

    setNewState(stateInfo){
        this.setName(stateInfo.name);
        this.setUf(stateInfo.uf);
        this.setCapitalCityId(stateInfo.capital_city_id);
    }

    // SETTERS
    setId(id){
        if(!id) {
            throw new APIError("Estado precisa de um ID", 403);
        }

        this.id = id;
    }

    setName(name){
        if(!name) {
            throw new APIError("Nome precisa ter caracteres", 403);
        }

        this.name = name;
    }

    setUf(uf){
        this.uf = uf;
    }

    setCapitalCityId(capital_city_id){
        this.capital_city_id = capital_city_id;
    }

    setIsCapital(is_capital){
        this.is_capital = is_capital;
    }

    setCapitalCity(stateInfo){
        this.capital_city = {
            id: stateInfo.city_id,
            name: stateInfo.city_name
        }
    }


    // Retorna uma Estado com base nas colunas passadas por parâmetro
    static async getByColumns(params = [], joins = {}){
        const rowInfo = await this.getSQL(
            `SELECT ibge_state.*
                ${joins.capitalCity ? `,
                    ibge_city.id AS city_id,
                    ibge_city.name AS city_name
                ` : ``} 
            FROM ibge_state
                ${joins.capitalCity ? `
                    INNER JOIN ibge_city ON ibge_city.id = ibge_state.capital_city_id
                ` : ``}
            WHERE ${Object.keys(params).map(key => `ibge_state.${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new StateModel(rowInfo)
        }else{
            throw new APIError("Estado não encontrado", 404);
        }
    }

    // Retorna Estados com base nas colunas passadas por parâmetro
    static async allByColumns(params = [], joins = {}){
        const rows = await this.allSQL(
            `SELECT ibge_state.*
                ${joins.capital ? `,
                    ibge_city.id AS city_id,
                    ibge_city.name AS city_name
                ` : ``} 
            FROM ibge_state
                ${joins.capital ? `
                    INNER JOIN ibge_city ON ibge_city.id = ibge_state.capital_city_id
                ` : ``}
            ${params.length ? `WHERE ${Object.keys(params).map(key => `ibge_state.${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new StateModel(rowInfo).getObject())
        }else{
            throw new APIError("Estado não encontrada", 404);
        }
    }

}

module.exports = StateModel;