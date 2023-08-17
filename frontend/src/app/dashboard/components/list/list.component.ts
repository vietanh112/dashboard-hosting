import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../services/hosting-product.service';
import { SearchService } from '../../services/search.service';
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
    confirmModalDelete?: NzModalRef;
    searchValue = '';
    visible = false;
    sizeButton: NzButtonSize = 'large';
    listHosting: any = [];
    totalHosting: number = 0;
    hosting: any = undefined;
    listVlan: any = [];
    search: any = {
        keyword: null,
        vlan: null,
        server: null,
        status: null,
        port: null
    };
    loadingState:boolean = false;
    routeParams: any = {
        server: null
    }
    page: number = 1;
    limit: number = 10;
    listServer: any = [];
    listPort: any = [];
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

    typeList: any = {
        vlan: 'list',
        port: 'list',
        server: 'list',
    }

    sizePage: any = [10, 20, 50];
    searchLoading: {
      server: boolean,
      vlan: boolean,
      port: boolean,
    } = {
      server: false,
      vlan: false,
      port: false,
    }

  constructor(
    public productService: DashboardHostingProductService,
    public searchService: SearchService,
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
            if (typeof (params['vlan']) !== 'undefined') {
                this.search.vlan = params['vlan'];
            }
            if (typeof (params['port']) !== 'undefined') {
                this.search.port = params['port'];
            }
            if (typeof (params['page']) !== 'undefined') {
                this.page = params['page'];
            }
            if (typeof (params['limit']) !== 'undefined') {
                this.limit = params['limit'];
            }

        })
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getListSearch();
            this.getList();
        }, 0)
    }

    getListSearch () {
        this.searchService.selectSearch({type: 'hosting'}).subscribe(res => {
          this.listServer = res.server;
          this.listPort = res.port;
          this.listVlan = res.vlan;

          if(this.listServer) {
            this.listServer.unshift({id: null, name: 'All'});
          }
          if(this.listPort) {
            this.listPort.unshift({id: null, port: 'All'});
          }
          if(this.listVlan) {
            this.listVlan.unshift({id: null, name: 'All'});
          }
        })
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    showModalInfor(data: any) {
        this.checkVisibleInfor = true;
        this.hosting = data;
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
        this.hosting = data;
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
        if(this.search.vlan) {
            queries['vlan'] = Number(this.search.vlan);
        }
        if(this.search.server) {
            queries['server'] = Number(this.search.server);
        }
        if(this.search.status) {
            queries['status'] = Number(this.search.status);
        }
        if(this.search.port) {
            queries['port'] = Number(this.search.port);
        }
        this.productService.list(queries).subscribe(res => {
            this.loadingState = false;
            this.listHosting = res.list;
            this.totalHosting = res.total;
            console.log(this.listHosting);
            
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

    pageIndexChange(event: any) {
        this.page = Number(event);
        this.getList();
    }

    pageSizeChange(event: any) {
        this.limit = event;
        this.getList()
    }

    searchServer(value: any) {
      this.searchStr(value, 'server');
    }

    searchPort(value: any) {
      this.searchStr(value, 'port');
    }

    searchVlan(value: any) {
      this.searchStr(value, 'vlan');
    }

    serverChange(value: any) {
        this.searchPort('');
        this.searchVlan('');
    }

    searchStr(value: any, type: string) {
      let obj: any = {};
      
      if(value != null && value != undefined) {
        obj['keyword'] = value;
      }
        switch (type) {
          case "server":
            this.searchLoading.server = true;
            this.searchService.listServer(obj).subscribe(res => {
                this.listServer = res;
                if(res) {
                    this.listServer.unshift({id: null, name: 'All'});
                }
                this.searchLoading.server = false;
            })
            break;
          case "vlan":
            if(this.search.server) {
                obj['server'] = this.search.server;
            }
            else {
                obj['server'] = '';
            }
            console.log(obj);
            
            this.searchLoading.vlan = true;
            this.searchService.listVlan(obj).subscribe(res => {
                this.listVlan = res;
                if(res.length > 0 && !this.search.server && value) {
                    this.listVlan.unshift({id: null, name: 'All'});
                }
                this.searchLoading.vlan = false;
            })
            break;
          case "port":
            if(this.search.server) {
                obj['server'] = this.search.server;
            }
            else {
                obj['server'] = '';
            }
            this.searchLoading.port = true;
            this.searchService.listPort(obj).subscribe(res => {
                this.listPort = res;
                if(res.length > 0 && !this.search.server  && value) {
                    this.listPort.unshift({id: null, port: 'All'});
                }
                this.searchLoading.port = false;
            })
            break;
          default:
            break;
        }
    }
}
