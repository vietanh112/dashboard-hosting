import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';

import { environment } from '../../../environments/environment';
import {User} from '../../_core/model/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private key = 'currentUser';

    protected apiServerPaths = environment.apiServer.paths;

    private currentUserSubject: BehaviorSubject<User>;

    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
                private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.key)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    login(username: string, password: string) {
        return this.apiService.post(this.apiServerPaths.auth.login, {username, password}, map(response => {
                // @ts-ignore
                const data = response.data;
                // login successful if there's a jwt token in the response
                if (data && data.user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    this.currentUserSubject.next(data.user);
                    return response
                } else {
                    return response;
                }
            })
        );
    }

    register(dataRegister: any) {
        return this.apiService.post(this.apiServerPaths.auth.register, dataRegister, map(response => {
            return response;
        }));
    }

    forgotPassword(data: any) {
        return this.apiService.post(this.apiServerPaths.auth.forgotPassword, data, map(response => {
            return response;
        }));
    }

    changePassword(data: any) {
        return this.apiService.post(this.apiServerPaths.auth.changePassword, data, map((response: any) => {
            return response;
        }));
    }

    infor(userId: any) {
        let options: any = {
            params: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.auth.infor;
        path = path.replace('{USER_ID}', String(userId));
        return this.apiService.get(path, options, map((response: any) => {
                return response;
            })
        )
    }

    refreshToken(body: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        
        let path = this.apiServerPaths.auth.refreshToken;
        return this.apiService.patch(path, options, map((response: any) => {
            console.log(response);
            
            return response;
        })
    )}

    // checkUsername(username: any) {
    //     return this.apiService.post(this.apiServerPaths.auth.username, {username}, map(response => {
    //         // @ts-ignore
    //         if (response.status === 0) {
    //             return response;
    //         } else {
    //             return false;
    //         }
    //     }));
    // }

    // checkEmail(email: any) {
    //     return this.apiService.post(this.apiServerPaths.auth.email, {email}, map(response => {
    //         // @ts-ignore
    //         if (response.status === 0) {
    //             return response;
    //         } else {
    //             return false;
    //         }
    //     }));
    // }

    // checkPhone(phone: any) {
    //     return this.apiService.post(this.apiServerPaths.auth.phone, {phone}, map(response => {
    //         // @ts-ignore
    //         if (response.status === 0) {
    //             return response;
    //         } else {
    //             return false;
    //         }
    //     }));
    // }

    logout() {
        localStorage.removeItem(this.key);
        this.currentUserSubject.next(null);
    }

    // switchUser(userId: number) {
    //     let url = this.apiServerPaths.administrator.user.switchUser;
    //     url = url.replace('{USER_ID}', userId.toString())
    //     return this.apiService.post(url, {}, map(response => {
    //         // @ts-ignore
    //         const user = response.data.user;
    //         // @ts-ignore
    //         const originalUser = response.data.userOriginal;
    //         // login successful if there's a jwt token in the response
    //         if (user && user.accessToken) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem(this.key, JSON.stringify(user));
    //             localStorage.setItem(this.originalUserKey, JSON.stringify(originalUser));
    //             this.currentUserSubject.next(user);
    //             this.originalUserSubject.next(user);
    //         }
    //         return user;
    //         })
    //     );
    // }

    // switchUserOriginal() {
    //     if (this.originalUserValue.userId) {
    //         let url = this.apiServerPaths.administrator.user.switchUserOriginal;
    //         url = url.replace('{USER_ID}', this.originalUserValue.userId.toString())
    //         return this.apiService.post(url, {}, map(response => {
    //                 // @ts-ignore
    //                 const user = response.data.user;
    //                 // login successful if there's a jwt token in the response
    //                 if (user && user.accessToken) {
    //                     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                     localStorage.setItem(this.key, JSON.stringify(user));
    //                     localStorage.removeItem(this.originalUserKey);
    //                     this.currentUserSubject.next(user);
    //                     this.originalUserSubject.next(null);
    //                 }
    //                 return user;
    //             })
    //         );
    //     }
    // }
}
