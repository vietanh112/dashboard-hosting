import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

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
    validate: boolean = true;
    @Input() idUpdate: string = null;
    @Output() checkVisibleChangePasswordChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
    }

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
        
    ) {
        
    }

    handleCancel(): void {
        this.checkVisibleChangePassword = false;
        this.checkVisibleChangePasswordChange.emit(false);
    }

    loadingOk():void {
        
    }
    checkValidate() {
        if(this.formUpdate.oldPassword != '' && this.formUpdate.newPassword != '' && this.formUpdate.confirmNewPassword != ''){
            this.validate = false;
        }
    }

    changePassword() {
        this.checkValidate();
        if(this.validate) {
            return
        }
        this.formUpdate['id'] = this.idUpdate;
        this.authenticationService.changePassword(this.formUpdate).subscribe((res: any) => {
            if(res['status'] == 1 && res['code']==200) {
                localStorage.clear();
                setTimeout(() => {
                    this.router.navigate(['auth', 'login']);
                }, 5000);
                // this.router.navigate(['auth', 'login'], {queryParams: {returnUrl: this.state.url}});
            }
        })
    }
}