const APIError = require("../services/ErrorService");
const Model = require("./Model");

class CityModel extends Model {
    id;
    name;
    number_people;
    is_capital;
    state_id;
    state;

    constructor(cityInfo) {
        super({ 'tableName': 'ibge_city', 'identifierColumns': ['id'], 'codeColumns': ['state']})

        if(cityInfo.id){
            this.setCity(cityInfo)
        }else{
            this.setNewCity(cityInfo)
        }
    }

    setCity(cityInfo){
        this.setId(cityInfo.id);
        this.setName(cityInfo.name);
        this.setNumberPeople(cityInfo.number_people);
        this.setStateId(cityInfo.state_id);
        this.setIsCapital(cityInfo.is_capital);

        this.setState(cityInfo)
    }

    setNewCity(cityInfo){
        this.setName(cityInfo.name);
        this.setNumberPeople(cityInfo.number_people);
        this.setStateId(cityInfo.state_id);
        this.setIsCapital(cityInfo.is_capital);
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

    setNumberPeople(number_people){
        this.number_people = number_people;
    }

    setStateId(state_id){
        this.state_id = state_id;
    }

    setState(stateInfo){
        this.state = {
            id: stateInfo.state_id,
            name: stateInfo.state_name,
            uf: stateInfo.state_uf,
        }
    }

    setIsCapital(is_capital){
        this.is_capital = is_capital;
    }


    // Retorna uma Cidade com base nas colunas passadas por parâmetro
    static async getByColumns(params = [], joins = {}){
        const rowInfo = await this.getSQL(
            `SELECT ibge_city.* 
                ${joins.state ? `,
                    ibge_state.id AS state_id,
                    ibge_state.name AS state_name,
                    ibge_state.uf AS state_uf
                `: ``} 
            FROM ibge_city
                ${joins.state ? `
                    INNER JOIN ibge_state ON ibge_state.id = ibge_city.state_id
                `: ``} 
            WHERE ${Object.keys(params).map(key => `ibge_city.${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new CityModel(rowInfo)
        }else{
            throw new APIError("Cidade não encontrada", 404);
        }
    }

    // Retorna Cidades com base nas colunas passadas por parâmetro
    static async allByColumns(params = [], joins = {}){
        const rows = await this.allSQL(
            `SELECT ibge_city.*
                ${joins.state ? `,
                    ibge_state.id AS state_id,
                    ibge_state.name AS state_name,
                    ibge_state.uf AS state_uf
                `: ``} 
            FROM ibge_city
                ${joins.state ? `
                    INNER JOIN ibge_state ON ibge_state.id = ibge_city.state_id
                `: ``} 
            ${params.length ? `WHERE ${Object.keys(params).map(key => `ibge_city.${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new CityModel(rowInfo).getObject())
        }else{
            throw new APIError("Cidade não encontrada", 404);
        }
    }

}

module.exports = CityModel;