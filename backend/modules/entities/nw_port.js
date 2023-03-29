class PortModel {
    id = '';
    port = '';
    description = '';
    server = null;
    status = null;
    createdAt = '';
    updatedAt = '';
    serverName = '';
    

    constructor(data) {
        this.id = String(data.ID) || '';
        this.port = data.PORT || null;
        this.description = data.DESCRIPTION || '';
        this.server = String(data.SERVER) ?? null;
        this.status = String(data.STATUS) ?? null;
        this.createdAt = data.CREATE_AT || '';
        this.updatedAt = data.UPDATE_AT || '';
        this.serverName = data.NAME_SERVER || '';
    }
}

module.exports = PortModel;