import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";
import { SearchService } from '../../../services/search.service';

@Component({
    selector: 'app-dashboard-modal-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdate implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdate: boolean = false;
    @Input() hosting: any = {};
    @Input() listServer: any = [];
    @Input() listVlan: any = [];
    @Input() listPort: any = [];

    formUpdate: any = {
        id: '',
        ipaddress: '',
        ipaddressf5: '',
        hostname: '',
        port: '',
        priority: '',
        env: '',
        type: '',
        middleware: '',
        information: '',
        machineType: '',
        os: '',
        note: '',
        na: '',
        status: null,
        vlan: null,
        server: null
    };
    @Output() checkVisibleUpdateChange: EventEmitter<boolean> = new EventEmitter<boolean>();


    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]

    searchLoading: {
      server: boolean,
      vlan: boolean,
      port: boolean,
    } = {
      server: false,
      vlan: false,
      port: false,
    }

    ngOnInit(): void {

    }
    ngAfterViewInit(): void {
    }

    constructor(public productService: DashboardHostingProductService,
                public searchService: SearchService,) {

    }

    handleOk(): void {
        this.updateHosting();
    }

    handleCancel(): void {
        this.checkVisibleUpdate = false;
        this.checkVisibleUpdateChange.emit(this.checkVisibleUpdate);
    }

    loadingOk():void {
        this.getHosting();
    }


    getHosting() {
        this.formUpdate.id = this.hosting.id;
        this.formUpdate.ipaddress = this.hosting.ipaddress;
        this.formUpdate.ipaddressf5 = this.hosting.ipaddressf5;
        this.formUpdate.hostname = this.hosting.hostname;
        this.formUpdate.priority = this.hosting.priority;
        this.formUpdate.env = this.hosting.env;
        this.formUpdate.type = this.hosting.type;
        this.formUpdate.middleware = this.hosting.middleware;
        this.formUpdate.information = this.hosting.information;
        this.formUpdate.machineType = this.hosting.machineType;
        this.formUpdate.os = this.hosting.os;
        this.formUpdate.note = this.hosting.note;
        this.formUpdate.na = this.hosting.na;
        this.formUpdate.status = this.hosting.status;
        this.formUpdate.server = String(this.hosting.server);
        this.formUpdate.vlan = String(this.hosting.vlan);
        this.formUpdate.port = String(this.hosting.port);
    }

    updateHosting() {
        this.productService.update(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdateChange.emit(response);
            this.checkVisibleUpdate = false;
        })
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
            this.searchLoading.vlan = true;
            this.searchService.listVlan(obj).subscribe(res => {
                this.listVlan = res;
                if(res) {
                    this.listVlan.unshift({id: null, name: 'All'});
                }
                this.searchLoading.vlan = false;
            })
            break;
          case "port":
            this.searchLoading.port = true;
            this.searchService.listPort(obj).subscribe(res => {
                this.listPort = res;
                if(res) {
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
