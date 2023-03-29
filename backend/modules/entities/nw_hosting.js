class HostingModel {
    id = '';
    ipaddress = '';
    ipaddressf5 = '';
    hostname = '';
    port = '';
    priority = '';
    env = '';
    type = '';
    middleware = '';
    information = '';
    machineType = '';
    os = '';
    note = '';
    na = '';
    status = null;
    vlan = null;
    server = null;
    createdat = '';
    updatedat = '';
    vlanName = '';
    serverName = '';
    portName = '';

    constructor(data) {
        this.id = data.ID || '';
        this.ipaddress = data.IPADDRESS || '';
        this.ipaddressf5 = data.IPADDRESSF5 || '';
        this.hostname = data.HOSTNAME || '';
        this.port = String(data.PORT) ?? '';
        this.priority = data.PRIORITY || '';
        this.env = data.ENV || '';
        this.type = data.TYPE || '';
        this.middleware = data.MIDDLEWARE || '';
        this.information = data.INFORMATION || '';
        this.machineType = data.MACHINE_TYPE || '';
        this.os = data.OS || '';
        this.note = data.NOTE || '';
        this.na = data.NA || '';
        this.status = String(data.STATUS) ?? 0;
        this.vlan = String(data.VLAN) ?? 0;
        this.server = String(data.SERVER) ?? 0;
        this.createdat = data.CREATE_AT || '';
        this.updatedat = data.UPDATE_AT || '';
        this.vlanName = data.NAME_VLAN || '';
        this.serverName = data.NAME_SERVER || '';
        this.portName = data.NAME_PORT || '';
    }
}

module.exports = HostingModel;
