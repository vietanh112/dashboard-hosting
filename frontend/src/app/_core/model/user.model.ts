export class User {
    id: number;
    email: string;
    username: string;
    fullName: string;
    accessToken: string;
    refreshTOken: string;
    createdTime: number;
    expiresIn: number;
    roleId: number;
    modules: any = [];
}
