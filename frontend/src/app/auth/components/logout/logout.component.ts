import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../../_core/services/authentication.service';


@Component({
    selector: 'app-auth-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})

export class AuthComponentLogout implements OnInit, AfterViewInit {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
    ngAfterViewInit(): void {
        
    }

    

    
}