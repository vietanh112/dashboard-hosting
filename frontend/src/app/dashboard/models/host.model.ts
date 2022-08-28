
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
    vlantype: string = '';
    vlantypeinfor: string = '';
    createdat: string = '';
    updatedat: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.ipaddress = data.IPAddress || '';
        this.ipaddressf5 = data.IPAddressF5 || '';
        this.hostname = data.Hostname || '';
        this.priority = data.Priority || '';
        this.env = data.ENV || '';
        this.type = data.TYPE || '';
        this.middleware = data.Middleware || '';
        this.information = data.Information || '';
        this.machineType = data.MachineType || '';
        this.os = data.OS || '';
        this.note = data.Note || '';
        this.na = data.NA || '';
        this.vlantype = data.VlanType || '';
        this.vlantypeinfor = data.VlanTypeInfor || '';
        this.createdat = data.createdAt || '';
        this.updatedat = data.updatedAt || '';
    }
}
