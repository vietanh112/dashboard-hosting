import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../_core/services/authentication.service';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: any = this.authenticationService.currentUserValue;
        const date = new Date();

        if (currentUser && (currentUser.createdTime + currentUser.expiresIn) > Math.round(date.getTime()/1000) && currentUser['status'] == 1) {
            let expiresOut = currentUser.createdTime + currentUser.expiresIn;
            
            if((expiresOut - environment.jwt.timeRefresh) < Math.round(date.getTime()/1000)) {
                let body = {
                    id: currentUser.id,
                    accessToken: currentUser.accessToken,
                    refreshToken: currentUser.refreshToken,
                    username: currentUser.username
                }
                
                this.authenticationService.refreshToken(body).subscribe(res => {
                    console.log(res);
                    
                });
            }

            // authorised so return true
            return true;
        } else if (currentUser) {
            /**
             * Clear localStorage if token has been expired
             */
            localStorage.clear();
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['auth', 'login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
