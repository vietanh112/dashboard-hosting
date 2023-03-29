
export class VlanModel {
    id: string = '';
    name: string = '';
    description: string = '';
    server: string = null;
    status: string = null;
    createdAt: string = '';
    updatedAt: string = '';
    nameServer: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.name = data.name || '';
        this.description = data.description || '';
        this.server = String(data.server) ?? null;
        this.status = String(data.status) ?? null;
        this.nameServer = data.nameServer || '';
        this.createdAt = data.createdAt || '';
        this.updatedAt = data.updatedAt || '';
    }
}
