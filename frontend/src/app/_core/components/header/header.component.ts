import {Component, OnInit, AfterViewInit,Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../../_core/services/authentication.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-core-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class CoreComponentHeader implements OnInit, AfterViewInit {
    @Input() checkVisibleChangePassword: boolean = false;
    @Input() checkVisibleInfor: boolean = false;
    currentUser: any = undefined;

    ngOnInit(): void {
        this.getCurrentUser();
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public router: Router, private authenticationService: AuthenticationService, private modal: NzModalService,){

    }

    showModalChangePassword() {
        this.checkVisibleChangePassword = true;
    }

    showModalInfor() {
        this.checkVisibleInfor = true;
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    changePassword(e: any) {
        if(e) {
            this.checkVisibleChangePassword = false;
            this.notification(e);
        }
    }

    changeInfor(e: any) {

    }

    notification(event: any) {
        // @ts-ignore
        this.modal[event.type]({
            nzWidth: 350,
            nzOkText: null,
            nzTitle: `${event.data}`,
            nzContent: `${event.msg}</b>`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
            //@ts-ignore
            if(event.type == 'success') {

            }
        }, 2000);
    }
}