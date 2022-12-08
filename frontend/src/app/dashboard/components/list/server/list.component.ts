import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../../services/hosting-product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../../_core/services/authentication.service';


@Component({
    selector: 'app-dashboard-list-server-server',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class DashboardListServer implements OnInit, AfterViewInit {
    @Input() checkVisibleCreateServer: boolean = false;
    @Input() checkVisibleUpdateServer: boolean = false;
    confirmModalDelete?: NzModalRef;
    search: any = {
        keyword: null,
        server: null,
        status: null
    };
    loadingState:boolean = false;
    page: number = 1;
    limit: number = 10;
    listServer: any = undefined;
    dataServer: any = undefined;
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
        status: null
    };

    constructor(
        public productService: DashboardHostingProductService,
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
        })
    }
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getList();
        }, 0)
    }

    showModalCreateServer() {
        this.checkVisibleCreateServer = true;
    }

    showModalUpdateServer(data: any) {
        this.checkVisibleUpdateServer = true;
        this.dataServer = data;
    }

    deleteItem (hostingId: any) {
        this.productService.deleteServer(hostingId).subscribe((res: any) => {
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
            nzTitle: `${event.data} Server`,
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
            nzTitle: 'Bạn có muốn xóa Server?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa Server khỏi danh sách',
            nzOkDanger: true,
            nzOnOk: () => {
                this.deleteItem(hostingId);
            }
          });
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
        if(this.search.status) {
            queries['status'] = this.search.status;
        }
        this.productService.listServer(queries).subscribe(res => {
            this.loadingState = false;
            this.listServer = res;
        })
        const params = [];
        for (const i in queries) {
            if (queries[i] !== "") {
                params.push(i + '=' + queries[i]);
            }
        }
        this.location.replaceState(this.router.url.split('?')[0], params.join('&'));
    }

    createServer(res: any){
        this.checkVisibleCreateServer = false;
        if(res) {
            this.showNotification(res);
        }
    }
    updateServer(res: any){
        this.checkVisibleUpdateServer = false;
        if(res) {
            this.showNotification(res);
        }
    }
    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }
}