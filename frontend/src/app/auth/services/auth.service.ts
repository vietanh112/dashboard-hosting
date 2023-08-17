import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {ApiService} from '../../_core/services/api.service';
import {UserModel} from '../models/user.model';


declare const commons: any;
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    protected apiServerPaths = environment.apiServer.paths;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private router: Router,
        ) {}
    
    invalidToken(res: any) {
        if(res.code == 208 && res.status == 0) {
            localStorage.clear();
            this.router.navigate(['auth', 'login']);
        }
        return true;
    }
    
    listUser(queries: any) {
        let options: any = {
            params: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        // tslint:disable-next-line:forin
        for (const i in queries) {
            options['params'][i] = queries[i];
        }
        return this.apiService.get(this.apiServerPaths.auth.listUser, options, map((response: any) => {
                this.invalidToken(response);
                let rs: any = {
                    total: 0,
                    list: []
                }
                if(response.status == 1 && response.code == 200) {
                    if(response.data.data) {
                        response.data.data.forEach((item: any) => {
                            rs.list.push(new UserModel(item));
                        });
                    }
                    rs.total = response.data.total;
                }
                return rs;
            })
        )
    }

    deleteUser(userId: any) {
        let options: any = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.auth.deleteUser;
        path = path.replace('{USER_ID}', String(userId));
        return this.apiService.delete(path, options, map((response: any) => {
            return response;
        }));
    }
}