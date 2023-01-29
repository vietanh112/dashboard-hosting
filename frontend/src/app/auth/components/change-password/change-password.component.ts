import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-auth-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

export class AuthComponentChangePassword implements OnInit, AfterViewInit {
    @Input() checkVisibleChangePassword: boolean = false;
    formUpdate: any = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };
    @Input() user: any = undefined;
    @Output() checkVisibleChangePasswordChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    changePasswordForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder,
        
    ) {
        
    }

    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ["", [Validators.required]],
            newPassword: ["", [Validators.required, Validators.pattern('^[A-Za-z0-9!@#$%^&*()-_+=]{4,20}$')]],
            confirmNewPassword: ["", [this.confirmValidator]],
        })
    }
    ngAfterViewInit(): void {
    }

    handleCancel(): void {
        this.checkVisibleChangePassword = false;
        this.checkVisibleChangePasswordChange.emit(false);
    }

    loadingOk():void {
        
    }

    checkFormValid(){
        return !this.changePasswordForm.valid;
    }

    get f() {
        return this.changePasswordForm.controls;
    }

    confirmValidator = (control: any): { [s: string]: boolean } => {
        if (!control.value) {
          return { error: true, required: true };
        } else if (control.value !== this.f['newPassword'].value) {
          return { confirm: true, error: true };
        }
        return {};
    };

    changePassword() {
        let body: any = {
            oldPassword: this.f['oldPassword'].value,
            newPassword: this.f['newPassword'].value,
        }

        body['id'] = this.user.id;
        this.authenticationService.changePassword(body).subscribe((res: any) => {
            let response: any = {
                type: null,
                data: 'Change password',
                msg: 'Change password success'
            }
            if(res['status'] == 1 && res['code']==200) {
                response.type = 'success'
            }
            else if(res['status'] == 0 && res['code']==200) {
                response.type = 'warning'
                response.msg = 'Old password not match'
            }
            else {
                response.type = 'error',
                response.msg = 'Change password failed'
            }
            this.changePasswordForm.reset();
            this.checkVisibleChangePasswordChange.emit(response);
        })
    }

    
}