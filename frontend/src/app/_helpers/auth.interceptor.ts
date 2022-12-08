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

        if (currentUser && (currentUser.createdTime + currentUser.expiresIn) > date.getTime() && currentUser['status'] == 1) {
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
