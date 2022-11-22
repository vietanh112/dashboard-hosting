import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../services/hosting-product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../_core/services/authentication.service';


@Component({
    selector: 'app-dashboard-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class DashboardListHosting implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() checkVisibleCreate: boolean = false;
    @Input() checkVisibleUpdate: boolean = false;
    @Input() checkVisibleCreateVlan: boolean = false;
    @Input() checkVisibleCreateServer: boolean = false;
    @Input() dataHosting: any = undefined;
    confirmModalDelete?: NzModalRef;
    searchValue = '';
    visible = false;
    sizeButton: NzButtonSize = 'large';
    listHosting: any = [];
    totalList: number = 0;
    nameHosting: string = '';
    data: any = undefined;
    listVlan: any = undefined;
    search: any = {
        keyword: null,
        vlanType: null,
        server: null,
        status: null
    };
    loadingState:boolean = false;
    routeParams: any = {
        server: null
    }
    page: number = 1;
    limit: number = 10;
    listServer: any = undefined;
    currentUser: any = undefined;

    status: any = [
        {id: null, name: 'All'},
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'}
    ]
    
  constructor(
    public productService: DashboardHostingProductService,
    private modal: NzModalService,
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService){
        // this.router.events.subscribe((event: Event) => {
        //     if (event instanceof NavigationEnd) {
        //         let server = null;
        //         if(event.url.length < 16) {
        //             this.search.server = 1;
        //             return
        //         }
        //         server = event.url.slice(11, 14);
        //         switch (server) {
        //             case 'uat':
        //                 this.search.server = 1;
        //                 break;
        //             case 'pro':
        //                 this.search.server = 2;
        //                 break;
        //             default:
        //                 this.search.server = null;
        //                 break;
        //         }
        //     }
        // });
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        let queries = {}
        setTimeout(() => {
            this.productService.listVlan(queries).subscribe(res => {
                if(res) {
                    this.listVlan = res;
                }
            })
        }, 0)
        setTimeout(() => {
            this.productService.listServer(queries).subscribe(res => {
                if(res) {
                    this.listServer = res;
                }
            })
        }, 0)
        setTimeout(() => {
            this.getList();
        }, 0);
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    showModalInfor(data: any) {
        this.checkVisibleInfor = true;
        this.dataHosting = data;
        this.nameHosting = data.ipaddress;
    }

    showModalCreate() {
        this.checkVisibleCreate = true;
    }

    showModalCreateVlan() {
        this.checkVisibleCreateVlan = true;
    }

    showModalCreateServer() {
        this.checkVisibleCreateServer = true;
    }

    showModalUpdate(data: any) {
        this.checkVisibleUpdate = true;
        this.data = data.id;
    }

    getList() {
        this.loadingState = true;
        let queries: any = {
            page: this.page,
            limit: this.limit
        }
        if(this.search.keyword) {
            queries['keyword'] = this.search.keyword;
        }
        if(this.search.vlanType) {
            queries['vlanType'] = Number(this.search.vlanType);
        }
        if(this.search.server) {
            queries['server'] = Number(this.search.server);
        }
        if(this.search.status) {
            queries['status'] = Number(this.search.status);
        }
        this.productService.list(queries).subscribe(res => {
            this.loadingState = false;
            this.listHosting = res.list;
            this.totalList = res.total;
        })
        const params = [];
        for (const i in queries) {
            if (queries[i] !== "") {
                params.push(i + '=' + queries[i]);
            }
        }
        this.location.replaceState(this.router.url.split('?')[0], params.join('&'));
    }
    showConfirmDelete(hostingId: any) {
        this.confirmModalDelete = this.modal.confirm({
            nzTitle: 'Bạn có muốn xóa hosting?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa Hosting khỏi danh sách',
            nzOkDanger: true,
            nzOnOk: () => {
                this.deleteItem(hostingId);
            }
          });
    }
    deleteItem (hostingId: any) {
        this.productService.delete(hostingId).subscribe((res: any) => {
            this.showNotification(res);
        })
    }
    showNotification(res: any) {
        this.notification(res);
    }
    createHosting(res: any){
        this.checkVisibleCreate = false;
        if(res) {
            this.showNotification(res);
        }
    }
    
    createServer(res: any){
        this.checkVisibleCreateServer = false;
        if(res) {
            this.showNotification(res);
        }
    }
    updateHosting(res: any){
        this.checkVisibleUpdate = false;
        if(res) {
            this.showNotification(res);
        }
    }
    notification(event: any) {
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.data} hosting`,
            nzContent: `${event.data} <b>${method}</b>`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
            if(method == 'success') {
                this.getList();
            }
        }, 2000);
    }

    pageChange(event: any) {
        this.limit = event;
        this.getList();
    }
}