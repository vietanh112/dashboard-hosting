import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from "rxjs/operators";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class AuthComponentLogin implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    loadingState:boolean = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private modal: NzModalService,
    ) {}
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            password: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()]{4,20}')]],
        })
    }
    ngAfterViewInit(): void {
        
    }

    get f() {
        return this.loginForm.controls;
    }

    submitForm(): void {
        this.loadingState = true;
        this.authenticationService.login(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe(res => {
            this.loadingState = false;
            
            let noti: any = {
                message: 'Success',
                method: 'success',
            }

            if(res.code == 200 && res.status == 1) {
                noti.message == res.message;
                this.notification(noti);
                setTimeout(() => {
                    this.router.navigate(['dashboard', 'list']);
                }, 1001);
                return 
            }
            else if (res.code != 200 && res.status == 0) {
                noti.message = res.message;
                noti.method = 'error';
                this.notification(noti);
            }
        })
    }

    notification(event: any) {
        let method = event.method;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `Login ${method}`,
            nzContent: `${event.message}`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
        }, 1000);
    }

    checkFormValid(){
        return !this.loginForm.valid;
    }
}