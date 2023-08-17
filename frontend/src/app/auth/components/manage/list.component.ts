import {Component, OnInit, AfterViewInit,Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {AuthService} from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SearchService } from '../../../dashboard/services/search.service';


@Component({
    selector: 'app-auth-manage',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class AuthComponentManage implements OnInit, AfterViewInit {
    @Input() checkVisibleCreate: boolean = false;
    @Input() checkVisibleUpdate: boolean = false;
    confirmModalDelete?: NzModalRef;

    loadingState:boolean = false;
    listPosition: any[] = [];
    listRole: any[] = [];
    listUser: any[] = [];
    totalUser: number = 0;
    page: number = 1;
    limit: number = 10;

    search: any = {
        username: null,
        roleId: null,
        positionId: null,
        status: null,
    };

    status: any = [
        {id: null, name: 'All'},
        {id: '-1', name: 'Disable'},
        {id: '1', name: 'Active'}
    ]

    searchLoading:{
        position: boolean,
        role: boolean
    } = {
        position: false,
        role: false
    }

    tag: any = [
        {name:'red', status:'-1', msg:'Disable'},
        {name:'green', status:'1', msg:'Active'}
    ]

    sizePage: any = [10, 20, 50];
    currentUser: any = undefined;

    user: UserModel = undefined;

    constructor(
        public authService: AuthService,
        private location: Location,
        private router: Router,
        private authenticationService: AuthenticationService,
        private modal: NzModalService,
        public searchService: SearchService
    ) {}
    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getListUser();
        }, 0)
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    getListUser() {
        this.loadingState = true;

        let queries: any = {
            page: this.page,
            limit: this.limit
        }
        queries['page'] = Number(queries['page']) - 1;

        if(Number(queries['page']) < 0) {
            queries['page'] = 0;
        }

        // if(this.search.keyword) {
        //     queries['keyword'] = this.search.keyword;
        // }
        // if(this.search.vlan) {
        //     queries['vlan'] = Number(this.search.vlan);
        // }
        // if(this.search.server) {
        //     queries['server'] = Number(this.search.server);
        // }
        // if(this.search.status) {
        //     queries['status'] = Number(this.search.status);
        // }
        // if(this.search.port) {
        //     queries['port'] = Number(this.search.port);
        // }
        this.authService.listUser(queries).subscribe(res => {
            this.loadingState = false;
            this.listUser = res.list;
            this.totalUser = res.total;
            console.log(this.listUser);
        })
        const params = [];
        for (const i in queries) {
            if (queries[i] !== "") {
                params.push(i + '=' + queries[i]);
            }
        }
        this.location.replaceState(this.router.url.split('?')[0], params.join('&'));
    }

    pageIndexChange(event: any) {
        this.page = Number(event);
        this.getListUser();
    }

    pageSizeChange(event: any) {
        this.limit = event;
        this.getListUser()
    }

    showModalCreate() {
        this.checkVisibleCreate = true;
    }

    createHosting(res: any){
        this.checkVisibleCreate = false;
        if(res) {
            this.showNotification(res);
        }
    }

    showModalUpdate(data: any) {
        this.checkVisibleUpdate = true;
        this.user = data;
    }

    showConfirmDelete(userId: any) {
        this.confirmModalDelete = this.modal.confirm({
            nzTitle: 'Bạn có muốn xóa user?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa User khỏi danh sách',
            nzOkDanger: true,
            nzOnOk: () => {
                this.deleteUser(userId);
            }
          });
    }

    deleteUser (userId: any) {
        this.authService.deleteUser(userId).subscribe((res: any) => {
            this.showNotification(res);
        })
    }

    notification(event: any) {
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.data} user`,
            nzContent: `${event.data} <b>${method}</b>`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
            if(method == 'success') {
                this.getListUser();
            }
        }, 2000);
    }

    showNotification(res: any) {
        this.notification(res);
    }

    searchPosition(value: any) {
        this.searchStr(value, 'position');
      }
  
      searchRole(value: any) {
        this.searchStr(value, 'role');
      }

      searchStr(value: any, type: string) {
        let obj: any = {};
        
        if(value != null && value != undefined) {
          obj['keyword'] = value;
        }
          switch (type) {
            case "role":
              this.searchLoading.role = true;
              this.searchService.listRole(obj).subscribe(res => {
                  this.listRole = res;
                  if(res.length > 0 && !this.search.roleId && value) {
                      this.listRole.unshift({id: null, name: 'All'});
                  }
                  this.searchLoading.role = false;
              })
              break;
            case "position":
              this.searchLoading.position = true;
              this.searchService.listPosition(obj).subscribe(res => {
                  this.listPosition = res;
                  if(res.length > 0 && !this.search.positionId && value) {
                      this.listPosition.unshift({id: null, name: 'All'});
                  }
                  this.searchLoading.position = false;
              })
              break;
            default:
              break;
          }
      }
}