import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../../services/hosting-product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../../_core/services/authentication.service';


@Component({
    selector: 'app-dashboard-list-port',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class DashboardListPort implements OnInit, AfterViewInit {
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
    listPort: any = undefined;
    listServer: any = undefined;
    dataPort: any = undefined;
    sizeButton: NzButtonSize = 'large';
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
        private authenticationService: AuthenticationService
    ){}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        let queries = {};
        setTimeout(() => {
            this.productService.listServer(queries).subscribe(res => {
                if(res) {
                    this.listServer = res;
                }
            })
            this.getList();
        }, 0)
    }

    showModalCreatePort() {
        this.checkVisibleCreatePort = true;
    }

    showModalUpdatePort(data: any) {
        this.checkVisibleUpdatePort = true;
        this.dataPort = data;
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
            this.listPort = res;
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
}