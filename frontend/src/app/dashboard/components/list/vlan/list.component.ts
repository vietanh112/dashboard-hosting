import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../../services/hosting-product.service';
import { SearchService } from '../../../services/search.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../../_core/services/authentication.service';


@Component({
    selector: 'app-dashboard-list-vlan',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class DashboardListVlan implements OnInit, AfterViewInit {
    @Input() checkVisibleCreateVlan: boolean = false;
    @Input() checkVisibleUpdateVlan: boolean = false;
    confirmModalDelete?: NzModalRef;
    search: any = {
        keyword: null,
        server: null,
        status: null
    };
    loadingState:boolean = false;
    page: number = 1;
    limit: number = 10;
    listVlan: any = [];
    listServer: any = [];
    dataVlan: any = undefined;
    sizeButton: NzButtonSize = 'large';
    currentUser: any = undefined;

    status: any = [
        {id: null, name: 'All'},
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'}
    ]

    routeParams: any = {
        keyword: null,
        status: null,
        server: null
    };

    totalVlan: number = 0;
    sizePage: any = [10, 20, 50];

    listServerModal: any = [];

    searchLoading:boolean = false;

    constructor(
        public productService: DashboardHostingProductService,
        public searchService: SearchService,
        private modal: NzModalService,
        private location: Location,
        private router: Router,
        private authenticationService: AuthenticationService,
        public activatedRoute: ActivatedRoute,
    ){
        // this.router.events.subscribe((event: Event) => {
        //     if (event instanceof NavigationEnd) {
        //         let server = null;
        //         if(event.url.length < 11) {
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
            this.getSearch();
            this.getList();
            this.getInfoModal();
        }, 0)
    }

    showModalCreateVlan() {
        this.checkVisibleCreateVlan = true;
    }

    showModalUpdateVlan(data: any) {
        this.checkVisibleUpdateVlan = true;
        this.dataVlan = data;
    }

    deleteItem (hostingId: any) {
        this.productService.deleteVlan(hostingId).subscribe((res: any) => {
            this.showNotification(res);
        })
    }

    showNotification(res: any) {
        this.notification(res);
    }

    getInfoModal() {
        this.searchService.listServer({}).subscribe(res => {
            this.listServerModal = res.list;
        })
    }

    notification(event: any) {
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzWidth: 350,
            nzOkText: null,
            nzTitle: `${event.data} Vlan`,
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

    showConfirmDelete(hostingId: any) {
        this.confirmModalDelete = this.modal.confirm({
            nzTitle: 'Bạn có muốn xóa Vlan?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa Vlan khỏi danh sách',
            nzOkDanger: true,
            nzOnOk: () => {
                this.deleteItem(hostingId);
            }
          });
    }

    getSearch() {
        this.searchService.selectSearch({type: 'vlan'}).subscribe(res => {
            this.listServer = res.list;
            if(res.list) {
                this.listServer.unshift({id: null, name: 'All'});
            }
        })
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
        this.productService.listVlan(queries).subscribe(res => {
            this.loadingState = false;
            this.listVlan = res.list;
            this.totalVlan = res.total;
        })
        const params = [];
        for (const i in queries) {
            if (queries[i] !== "") {
                params.push(i + '=' + queries[i]);
            }
        }
        this.location.replaceState(this.router.url.split('?')[0], params.join('&'));
    }

    createVlan(res: any){
        this.checkVisibleCreateVlan = false;
        if(res) {
            this.showNotification(res);
        }
    }
    updateVlan(res: any){
        this.checkVisibleUpdateVlan = false;
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

    searchServer(value: any) {
        this.searchLoading = true;
        this.searchService.listServer({keyword: value}).subscribe(res => {
            this.listServer = res.list;
            if(res.list) {
                this.listServer.unshift({id: null, name: 'All'});
            }
            this.searchLoading = false;
        })    
    }
}