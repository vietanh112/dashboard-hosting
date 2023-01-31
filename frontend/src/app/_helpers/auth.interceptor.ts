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
                const myPromise = new Promise((resolve, reject) => {
                  this.authenticationService.refreshToken(body).subscribe(res => {
                    if(res == true) {
                      resolve(true);
                    }
                    else {
                      reject(false);
                    }
                  });
                })
                if(myPromise) {
                  return true;
                }
                else {
                  this.authenticationService.logout();
                  return false;
                }

            }
            else {
              return true
            }

            // authorised so return true

        } else if (currentUser) {
            /**
             * Clear localStorage if token has been expired
             */
            this.authenticationService.logout();
        }
        // not logged in so redirect to login page with the return url
        this.authenticationService.logout();
        return false;
    }
}
