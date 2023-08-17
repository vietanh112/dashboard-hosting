
export class UserModel {
    id: string = '';
    employeeId: string = '';
    username: string = '';
    email: string = null;
    roleId: string = null;
    positionId: string = '';
    allow: string = '';
    status: string = '';
    token: string = '';
    createAt: string = '';
    updateAt: string = '';
    roleName: string = '';
    positionName: string = '';

    constructor(data: any) {
        this.id = String(data.id) || '';
        this.employeeId = data.employeeId || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.roleId = String(data.roleId) || '';
        this.positionId = String(data.positionId) || '';
        this.allow = String(data.allow) || '';
        this.status = String(data.status) ?? null;
        this.token = data.token ?? null;
        this.createAt = data.createdAt || '';
        this.createAt = data.updatedAt || '';
        this.roleName = data.roleName || '';
        this.positionName = data.positionName || '';
    }
}
