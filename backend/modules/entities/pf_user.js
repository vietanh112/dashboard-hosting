class UserModel {
    id = null;
    employeeId = null;
    username = null;
    password = null;
    email = null;
    roleId = 0;
    positionId = 0;
    allow = 0;
    status = 0;
    token = null;
    tokenRefresh = null;
    createAt = null;
    updateAt = null;

    constructor(data) {
        this.id = data.ID ?? null;
        this.employeeId = data.EMPLOYEE_ID ?? null;
        this.username = data.USERNAME ?? null;
        this.password = data.PASSWORD ?? null;
        this.email = data.EMAIL ?? null;
        this.roleId = data.ROLE_ID ?? 0;
        this.positionId = data.POSITION_ID ?? 0;
        this.allow = data.ALLOW ?? 0;
        this.status = data.STATUS ?? 0;
        this.token = data.TOKEN ?? null;
        this.tokenRefresh = data.TOKEN_REFRESH ?? null;
        this.createAt = data.CREATE_AT ?? null;
        this.updateAt = data.UPDATE_AT ?? null;
    }
}

module.exports = UserModel;
