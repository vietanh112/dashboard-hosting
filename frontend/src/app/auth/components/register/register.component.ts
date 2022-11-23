import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from "rxjs/operators";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class AuthComponentRegister implements OnInit, AfterViewInit {
    registerForm: FormGroup;
    loadingState:boolean = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private modal: NzModalService,
    ) {}
    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern('[a-z0-9](\.?[a-z0-9]){5,}@[a-zA-Z0-9.]{2,30}')]],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            password: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()-_+=]{4,20}')]]
        })
    }
    ngAfterViewInit(): void {
        
    }

    get f() {
        return this.registerForm.controls;
    }

    submitForm(): void {
        this.loadingState = true;
        let body = {
            email: this.f['email'].value,
            username: this.f['username'].value,
            password: this.f['password'].value,
        }
        this.authenticationService.register(body).pipe(first()).subscribe(res => {
            this.loadingState = false;
            let noti: any = {
                message: 'Success',
                method: 'success',
                data: `Register successed`,
                time: 1500
            }
            if(res.code == 201) {
                noti.message = 'Error';
                noti.method = 'warning';
                noti.data = res.message;
                return this.notification(noti);
            }
            else if (res.code != 200) {
                noti.message = 'Error';
                noti.method = 'error';
                noti.data = res.message;
                return this.notification(noti);
            }
            else {
                noti.data = res.message;
                this.notification(noti);
                this.router.navigate(['auth', 'login']);
            }
        })
    }


    notification(event: any) {
        let method = event.method;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.message} Register`,
            nzContent: `${event.data}`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
        }, event.time);
    }

    checkFormValid(){
        return !this.registerForm.valid;
    }
}