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
            employeeId: [""],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            email: [""],
            password: ["", [Validators.required, Validators.pattern('^[A-Za-z0-9!@#$%^&*()-_+=]{4,20}$')]],
            confirmPassword: ["", [Validators.required]],
        })
    }
    ngAfterViewInit(): void {
        
    }

    get f() {
        return this.registerForm.controls;
    }

    submitForm(): void {
        this.loadingState = true;
        let noti: any = {
            message: 'Success',
            method: 'success',
            data: `Register successed`,
            time: 1500
        }
        let body = {
            employeeId: this.f['employeeId'].value,
            email: this.f['email'].value,
            username: this.f['username'].value,
            password: this.f['password'].value,
        }

        if(this.f['password'].value != this.f['confirmPassword'].value) {
            noti.method = 'warning';
            noti.message = 'Error';
            noti.data = 'Password and confirm password are not the same';
            this.f['password'].reset();
            this.f['confirmPassword'].reset();
            this.loadingState = false;
            return this.notification(noti);
        }

        this.authenticationService.register(body).pipe(first()).subscribe(res => {
            this.loadingState = false;
            
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