import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../../services/hosting-product.service';
import { SearchService } from '../../../services/search.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../../_core/services/authentication.service';
import {HostingModel} from '../../../models/host.model';


@Component({
    selector: 'app-dashboard-list-port',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class DashboardListPort implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() checkVisibleUpdate: boolean = false;
    @Input() checkVisibleCreatePort: boolean = false;
    @Input() checkVisibleUpdatePort: boolean = false;
    confirmModalDelete?: NzModalRef;
    search: any = {
        keyword: null,
        server: null,
        status: null
    };
    loadingState:boolean = false;
    page: number = 1;
    limit: number = 10;
    listPort: any = [];
    listServer: any = [];
    listVlan: any = [];
    hosting: HostingModel = undefined;
    port: any = undefined;
    sizeButton: NzButtonSize = 'large';
    currentUser: any = undefined;

    status: any = [
        {id: null, name: 'All'},
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'}
    ]

    tag: any = [
        {name:'red', status:'-1', msg:'Error'},
        {name:'orange', status:'0', msg:'Stop'},
        {name:'green', status:'1', msg:'Active'}
    ]

    totalPort: number = 0;
    sizePage: any = [10, 20, 50];

    routeParams: any = {
        keyword: null,
        status: null,
        server: null,
        page: 0,
        limit: 10
    };

    expandSet = new Set<number>();

    constructor(
        public productService: DashboardHostingProductService,
        public searchService: SearchService,
        private modal: NzModalService,
        private location: Location,
        private router: Router,
        private authenticationService: AuthenticationService,
        public activatedRoute: ActivatedRoute,
    ){
        this.activatedRoute.queryParams.subscribe(params => {
            this.routeParams = params;
            if (typeof (params['keyword']) !== 'undefined') {
                this.search.keyword = decodeURIComponent(params['keyword']);
            }
            if (typeof (params['status']) !== 'undefined') {
                this.search.status = params['status'];
            }
            if (typeof (params['server']) !== 'undefined') {
                this.search.server = params['server'];
            }
            if (typeof (params['page']) !== 'undefined') {
                this.page = params['page'];
            }
            if (typeof (params['limit']) !== 'undefined') {
                this.limit = params['limit'];
            }
        })
    }
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getListServer();
            this.getList();
        }, 0)
    }

    onExpandChange(id: number, checked: boolean): void {
        if (checked) {
            for(let i of this.listPort) {
                if(i.id == id) {
                    i['showListHosting'] = true;
                    if(i['callListHosting']) {
                        this.loadingState = true;
                        this.productService.list({port: Number(id)}).subscribe(res => {
                            this.loadingState = false;
                            i['listHosting'] = res.list;
                            i['callListHosting'] = false;
                        })
                    }
                }
            }
        } else {
            this.expandSet.delete(id);
            for(let i of this.listPort) {
                if(i.id == id) {
                    i['showListHosting'] = false;
                }
            }
        }
    }

    getListServer() {
        this.searchService.selectSearch({type: 'port'}).subscribe(res => {
            this.listServer = res.list;
        })
    }

    showModalCreatePort() {
        this.checkVisibleCreatePort = true;
    }

    showModalUpdatePort(data: any) {
        this.checkVisibleUpdatePort = true;
        this.port = data;
    }

    deleteItem (hostingId: any) {
        this.productService.deletePort(hostingId).subscribe((res: any) => {
            this.showNotification(res);
        })
    }

    showNotification(res: any) {
        this.notification(res);
    }

    notification(event: any) {
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzWidth: 350,
            nzOkText: null,
            nzTitle: `${event.data} Port`,
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

    showConfirmDelete(portId: any) {
        this.confirmModalDelete = this.modal.confirm({
            nzTitle: 'Bạn có muốn xóa Port?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa Port khỏi danh sách',
            nzOkDanger: true,
            nzOnOk: () => {
                this.deleteItem(portId);
            }
          });
    }

    getList() {
        this.loadingState = true;
        
        let queries: any = {
            page: this.page,
            limit: this.limit
        }
        queries['page'] = Number(queries['page']) - 1;

        if(Number(queries['page']) < 0) {
            queries['page'] = 0;
        }

        if(this.search.keyword) {
            queries['keyword'] = this.search.keyword;
        }
        if(this.search.server) {
            queries['server'] = Number(this.search.server);
        }
        if(this.search.status) {
            queries['status'] = Number(this.search.status);
        }
        this.productService.listPort(queries).subscribe(res => {
            this.loadingState = false;
            this.listPort = res.list;
            for(let i of this.listPort) {
                i['listHosting'] = [];
                i['showListHosting'] = false;
                i['callListHosting'] = true;
            }
            this.totalPort = res.total;
        })
        const params = [];
        for (const i in queries) {
            if (queries[i] !== "") {
                params.push(i + '=' + queries[i]);
            }
        }
        this.location.replaceState(this.router.url.split('?')[0], params.join('&'));
    }

    createPort(res: any){
        this.checkVisibleCreatePort = false;
        if(res) {
            this.showNotification(res);
        }
    }
    updatePort(res: any){
        this.checkVisibleUpdatePort = false;
        if(res) {
            this.showNotification(res);
        }
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    pageIndexChange(event: any) {
        this.page = Number(event);
        this.getList();
    }

    pageSizeChange(event: any) {
        this.limit = event;
        this.getList()
    }

}