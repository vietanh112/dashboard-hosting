import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../../services/hosting-product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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
        server: null
    };
    loadingState:boolean = false;
    page: number = 1;
    limit: number = 10;
    listVlan: any = undefined;
    listServer: any = undefined;
    data: any = undefined;
    sizeButton: NzButtonSize = 'large';

    constructor(
        public productService: DashboardHostingProductService,
        private modal: NzModalService,
        private location: Location,
        private router: Router,
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

    showModalCreateVlan() {
        this.checkVisibleCreateVlan = true;
    }

    showModalUpdateVlan(data: any) {
        this.checkVisibleUpdateVlan = true;
        this.data = data.id;
    }

    deleteItem (hostingId: any) {
        this.productService.deleteVlan(hostingId).subscribe((res: any) => {
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
        this.productService.listVlan(queries).subscribe(res => {
            this.loadingState = false;
            this.listVlan = res;
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
}