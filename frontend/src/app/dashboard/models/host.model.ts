
export class HostingModel {
    id: string = '';
    ipaddress: string = '';
    ipaddressf5: string = '';
    hostname: string = '';
    port: string = '';
    priority: string = '';
    env: string = '';
    type: string = '';
    middleware: string = '';
    information: string = '';
    machineType: string = '';
    os: string = '';
    note: string = '';
    na: string = '';
    status: string = null;
    vlan: string = null;
    server: string = null;
    createdat: string = '';
    updatedat: string = '';
    vlanName: string = '';
    serverName: string = '';
    portName: string = '';


    constructor(data: any) {
        this.id = String(data.id) || '';
        this.ipaddress = data.iPAddress || '';
        this.ipaddressf5 = data.iPAddressF5 || '';
        this.hostname = data.hostname || '';
        this.port = String(data.port) ?? '';
        this.priority = data.priority || '';
        this.env = data.env || '';
        this.type = data.type || '';
        this.middleware = data.middleware || '';
        this.information = data.information || '';
        this.machineType = data.machineType || '';
        this.os = data.os || '';
        this.note = data.note || '';
        this.na = data.na || '';
        this.status = String(data.status) ?? null;
        this.vlan = String(data.vlan) ?? null;
        this.server = String(data.server) ?? null;
        this.createdat = data.createdAt || '';
        this.updatedat = data.updatedAt || '';
        this.vlanName = data.nameVlan || '';
        this.serverName = data.nameServer || '';
        this.portName = data.namePort || '';
    }
}
