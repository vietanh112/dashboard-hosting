
export class ServerModel {
    id: string = '';
    name: string = '';
    description: string = '';
    status: string = null;
    createdAt: string = '';
    updatedAt: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.name = data.name || '';
        this.description = data.description || '';
        this.status = String(data.status) ?? null;
        this.createdAt = data.createdAt || '';
        this.updatedAt = data.updatedAt || '';
    }
}
