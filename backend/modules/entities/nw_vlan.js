class VlanModel {
    id = '';
    name = '';
    description = '';
    server = null;
    status = null;
    createdAt = '';
    updatedAt = '';
    nameServer = '';
    

    constructor(data) {
        this.id = String(data.ID) || '';
        this.name = data.NAME || '';
        this.description = data.DESCRIPTION || '';
        this.server = String(data.SERVER) ?? null;
        this.status = String(data.STATUS) ?? null;
        this.createdAt = data.CREATE_AT || '';
        this.updatedAt = data.UPDATE_AT || '';
        this.nameServer = data.NAME_SERVER || '';
    }
}

module.exports = VlanModel;