
export class PortModel {
    id: string = '';
    port: string = '';
    description: string = '';
    status: string = null;
    server: string = null;
    createdat: string = '';
    updatedat: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.port = data.port || '';
        this.description = data.description || '';
        this.status = String(data.status) ?? null;
        this.server = String(data.server) ?? null;
        this.createdat = data.createdAt || '';
        this.updatedat = data.updatedAt || '';
    }
}
