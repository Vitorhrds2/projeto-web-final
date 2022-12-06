const APIError = require("../services/ErrorService");
const Model = require("./Model");

class RelationsTagConstructionModel extends Model {
    construction_id;
    tag_id;

    constructor(relationsTagConstruction) {
        super({ 'tablename': 'cmrv_tag_construction', 'idendifierColumns': ['construction_id', 'tag_id'], 'codeColumns': ['tag', 'construction'] })

        this.setRelationsTagConstruction(relationsTagConstruction)
    }

    setRelationsTagConstruction(relationsTagConstruction){
        this.setConstructionId(relationsTagConstruction.construction_id);
        this.setTagId(relationsTagConstruction.tag_id);

        this.construction(relationsTagConstruction);
        this.setTag(relationsTagConstruction);
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

    setTagId(tag_id){
        this.tag_id = tag_id;
    }

    setTag(tagInfo){
        this.tag = {
            id: tagInfo.tag_id,
            name: tagInfo.tag_name,
        }
    }


    // Retorna uma obra com base nas colunas passadas por parâmetro
    static async getByColumns(params = {}, joins = {}){
        const rowInfo = await this.getSQL(
            `SELECT cmrv_tag_construction.*
            ${joins.construction ? `,
                cmrv_construction.id AS construction_id,
                cmrv_construction.name AS construction_name,
                cmrv_construction.description AS construction_description
            ` : ``}
            ${joins.tag ? `,
                    cmrv_tag.id AS tag_id,
                    cmrv_tag.name AS tag_name,
                ` : ``} 
            FROM cmrv_tag_construction
                ${joins.construction ? `
                    INNER JOIN cmrv_construction ON cmrv_construction.id = cmrv_tag_construction.construction_id
                    ` : ``}
                ${joins.tag ? `
                    INNER JOIN cmrv_tag ON cmrv_tag.id = cmrv_tag_construction.tag_id
                ` : ``} 
            WHERE ${Object.keys(params).map(key => `cmrv_tag_construction.${key} = $${key}`).join(" AND ")}`,
            params
        )

        if(rowInfo){
            return new ConstructionBuilderInterestModel(rowInfo)
        }else{
            throw new APIError("Relacionamento de Tags não encontrado", 404);
        }
    }


    // Retorna obras com base nas colunas passadas por parâmetro
    static async allByColumns(params = {}){
        const rows = await this.allSQL(
            `SELECT cmrv_tag_construction.* 
            FROM cmrv_tag_construction
            ${Object.keys(params).length ? `WHERE ${Object.keys(params).map(key => `${key} = $${key}`).join(" AND ")}` : ``}`,
            params
        )

        if(rows.length){
            return rows.map(rowInfo => new RelationsTagConstructionModel(rowInfo).getObject())
        }else{
            throw new APIError("Relacionamento de tags não encontrado", 404);
        }
    }
}


module.exports = RelationsTagConstructionModel;