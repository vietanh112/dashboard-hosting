
export class HostingModel {
    id: string = '';
    ipaddress: string = '';
    ipaddressf5: string = '';
    hostname: string = '';
    priority: string = '';
    env: string = '';
    type: string = '';
    middleware: string = '';
    information: string = '';
    machineType: string = '';
    os: string = '';
    note: string = '';
    na: string = '';
    vlanType: number = null;
    server: number = null;
    createdat: string = '';
    updatedat: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.ipaddress = data.iPAddress || '';
        this.ipaddressf5 = data.iPAddressF5 || '';
        this.hostname = data.hostname || '';
        this.priority = data.priority || '';
        this.env = data.env || '';
        this.type = data.type || '';
        this.middleware = data.middleware || '';
        this.information = data.information || '';
        this.machineType = data.machineType || '';
        this.os = data.os || '';
        this.note = data.note || '';
        this.na = data.na || '';
        this.vlanType = data.vlanType || null;
        this.server = data.server || null;
        this.createdat = data.createdAt || '';
        this.updatedat = data.updatedAt || '';
    }
}
