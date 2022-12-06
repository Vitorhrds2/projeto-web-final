const ConnectionService = require('../services/ConnectionService');
const APIError = require('../services/ErrorService');

class Model {
    tableName; // Nome da tabela no banco de dados
    identifierColumns = ['id']; // Nome das colunas de identificação (id em entidades fortes e ids de relações em tabelas de relacionamento)
    codeColumns = ['identifierColumns', 'tableName', 'codeColumns']

    constructor(params) {
        this.tableName = params['tableName'];
        this.identifierColumns = params['identifierColumns'];
        if(params.codeColumns && params.codeColumns.length){
            this.codeColumns.concat(params.codeColumns)
        }
    }

    // Verifica se todas as colunas de identificação estão setadas
    verifyIdentifierColumns(){
        const identifierParams = this.getIdentifierColumnsObject();

        let identifierParamsSetted = true;

        Object.values(identifierParams).forEach(element => {
            if (!element) {
                identifierParamsSetted = false
            }
        })

        return identifierParamsSetted;
    }

    // Retorna como Entries ([[key, value]]) todos os atributos da classe que não sejam de lógica como tableName e identifierColumns
    getObjectEntries() {
        return Object.entries(this).filter(entrie => {
            return !this.codeColumns.includes(entrie[0])
        })
    }


    // Retorna como objeto todos os atributos da classe que não sejam como tableName e identifierColumns
    getObject() {
        const object = {}

        this.getObjectEntries().forEach(entrie => {
            object[entrie[0]] = entrie[1]
        })

        return object;
    }

    // Retorna como um objeto todos os atributos de identificação da classe da forma que devem ser passados como parâmetro para queries 
    getIdentifierColumnsObject() {
        const object = {};

        this.getObjectEntries().filter(entrie => this.identifierColumns.includes(entrie[0])).forEach(entrie => {
            object[`${entrie[0]}`] = entrie[1]
        })

        return object
    }

    // Seta os atributos da classe de acordo com o array ou objeto passado por parâmetro dinâmicamente
    async setRealModelAttributes(attributes) {
        return this.getObjectEntries().forEach(entrie => {
            this[entrie[0]] = attributes[entrie[0]]
        })
    }

    // Obtem uma tupla da tabela de acordo com as colunas identificadoras
    async getByIdentifierColumns() {
        return ConnectionService.get(
            `SELECT ${this.tableName}.* 
            FROM ${this.tableName} 
            WHERE ${this.identifierColumns.map(key => `${key} = $${key}`).join(" AND ")}`,
            this.getIdentifierColumnsObject()
        )
    }

    static async getSQL(query, params) {
        return ConnectionService.get(query, params);
    }

    static async allSQL(query, params) {
        return ConnectionService.all(query, params);
    }

    // Insere um registro no banco de dados com os valores que estão na classe
    async insert() {
        const query = 
        `INSERT INTO ${this.tableName} 
            (${this.getObjectEntries().map(entrie => entrie[0]).join(", ")})
        VALUES
            (${this.getObjectEntries().map(entrie => `$${entrie[0]}`).join(", ")})`;

        if ((this.identifierColumns.length == 1 && !this.verifyIdentifierColumns()) || this.identifierColumns.length != 1) {
            const id = await ConnectionService.insert(
                query,
                this.getObject()
            )

            if(this.identifierColumns.length == 1){
                this[this.identifierColumns[0]] = id;
            }

            return id;
        } else {
            throw new APIError(`Objeto não pode ser criado se já possui um identificador`, 403, query)
        }
    }

    static async insertSQL(query, params) {
        return ConnectionService.insert(query, params);
    }

    // Atualiza no banco de dados a tupla referente ao objeto atual
    async update() {
        if (this.verifyIdentifierColumns() && this.identifierColumns.length) { // Só aplica o update se as colunas identificadoras estiverem setadas
            return ConnectionService.update(
                `UPDATE ${this.tableName} 
                    SET ${this.getObjectEntries().map(entrie => `${entrie[0]} = $${entrie[0]}`).join(", ")} 
                WHERE ${this.identifierColumns.map(key => `${key} = $${key}`).join(" AND ")}`,
                this.getObject()
            )
        } else {
            throw new APIError(`Objeto não pode ser editado pois não existe um identificador`, 403, query)
        }
    }

    static async updateSQL(query, params) {
        return ConnectionService.update(query, params);
    }

    // Deleta um registro no banco de dados referente ao objeto atual
    async delete() {
        if (this.verifyIdentifierColumns() && this.identifierColumns.length) { // Só aplica o delete se existirem colunas de identificação setadas, previnindo exclusões em toda a tabela por acidente
            return ConnectionService.delete(
                `DELETE FROM ${this.tableName} WHERE ${this.identifierColumns.map(key => `${key} = $${key}`).join(" AND ")}`,
                this.getIdentifierColumnsObject()
            )
        }
    }

    static async deleteSQL(query, params) {
        return ConnectionService.delete(query, params);
    }
}

module.exports = Model;