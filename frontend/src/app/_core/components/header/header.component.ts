import {Component, OnInit, AfterViewInit,Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../../_core/services/authentication.service';


@Component({
    selector: 'app-core-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class CoreComponentHeader implements OnInit, AfterViewInit {
    @Input() checkVisibleChangePassword: boolean = false;
    @Input() checkVisibleInfor: boolean = false;
    data: any;
    currentUser: any = undefined;

    ngOnInit(): void {
        this.getCurrentUser();
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public router: Router, private authenticationService: AuthenticationService){

    }

    showModalChangePassword() {
        this.checkVisibleChangePassword = true;
    }

    showModalInfor() {
        this.checkVisibleInfor = true;
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
        this.data = this.currentUser.id;
    }

    changePassword(e: any) {

    }

    changeInfor(e: any) {

    }
}