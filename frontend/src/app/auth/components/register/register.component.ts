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
            email: ["", [Validators.required, Validators.pattern('[a-z0-9](\.?[a-z0-9]){5,}@shb.com.vn')]],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            password: ["", [Validators.required, Validators.pattern('[A-Za-z0-9]{4,20}')]]
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
        this.authenticationService.register(body).pipe(first()).subscribe(data => {
            console.log(data);
            
            if(data == false) {
                this.notification({
                    title: 'register',
                    message: 'Error',
                    method: 'error',
                    data: `<b>Username</b> or <b>Password</b> failed`,
                    time: 2000
                });
                this.loadingState = false;
            }
            else {
                if(data.code == 200 && data.status == 0) {
                    this.notification({
                        title: 'register',
                        message: 'Error',
                        method: 'error',
                        data: `<b>Username</b> failed`,
                        time: 2000
                    });
                    this.loadingState = false;
                }
                else {
                    this.notification({
                        title: 'register',
                        message: 'Success',
                        method: 'success',
                        data: `Register successed`,
                        time: 1500
                    });
                    setTimeout(() => {
                        const urlData = this.returnUrl ? this.returnUrl.split('?') : [];
                        const path = urlData.length > 0 ? urlData[0] : '/dashboard/list';
                        const queries = urlData.length > 1 ? urlData[1].split('&') : [];
                        let navExt = {};
                            if (queries.length > 0) {
                                // tslint:disable-next-line:forin
                                for (const i in queries) {
                                    navExt = Object.assign(navExt, queries[i]);
                                }
                            }
                        this.router.navigate([path], navExt);
                    }, 1500);
                }
            }
        }, error => {
            this.loadingState = false;
        })
    }


    notification(event: any) {
        let method = event.method;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.message} ${event.title}`,
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