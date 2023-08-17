
export class PositionModel {
    id: string = '';
    name: string = '';
    status: string = null;
    createdat: string = '';
    updatedat: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.name = data.name || '';
        this.status = String(data.status) ?? null;
        this.createdat = data.createdAt || '';
        this.updatedat = data.updatedAt || '';
    }
}
