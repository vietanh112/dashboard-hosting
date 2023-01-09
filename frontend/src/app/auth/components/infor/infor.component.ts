import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
    selector: 'app-auth-infor',
    templateUrl: './infor.component.html',
    styleUrls: ['./infor.component.scss']
})

export class AuthComponentInfor implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    form: any = {
        id: '',
        email: '',
        username: '',
        status: '',
        role: ''
    };
    validate: boolean = true;
    @Input() user: any = {};
    @Output() checkVisibleInforChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.authenticationService.infor(this.user.id).subscribe((res: any) => {
                if(res?.status == 0 && res?.code == 200) {
                    this.router.navigate(['auth/logout']);
                }
                return
            })
        }, 0);
    }

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
        
    ) {
        
    }

    handleCancel(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(false);
    }

    loadingOk():void {
        
    }
    
}