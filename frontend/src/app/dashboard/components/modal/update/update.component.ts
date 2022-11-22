import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";


@Component({
    selector: 'app-dashboard-modal-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdate implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdate: boolean = false;
    @Input() idUpdate: string = null;
    formUpdate: any = {
        id: '',
        ipaddress: '',
        ipaddressf5: '',
        hostname: '',
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
        vlanType: null,
        server: null
    };
    @Output() checkVisibleUpdateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    listVlan: any = undefined;
    listServer: any = undefined;
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
    }

    constructor(public productService: DashboardHostingProductService) {
        
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
        let queries = {}
        this.productService.listVlan(queries).subscribe(res => {
            if(res) {
                this.listVlan = res;
            }
        })
        this.productService.listServer(queries).subscribe(res => {
            if(res) {
                this.listServer = res;
            }
        })
       
        
    }
    getHosting() {
        let queries = {
            id: this.idUpdate
        }
        this.productService.list(queries).subscribe(res => {
            this.formUpdate.id = res.list[0].id;
            this.formUpdate.ipaddress = res.list[0].ipaddress;
            this.formUpdate.ipaddressf5 = res.list[0].ipaddressf5;
            this.formUpdate.hostname = res.list[0].hostname;
            this.formUpdate.priority = res.list[0].priority;
            this.formUpdate.env = res.list[0].env;
            this.formUpdate.type = res.list[0].type;
            this.formUpdate.middleware = res.list[0].middleware;
            this.formUpdate.information = res.list[0].information;
            this.formUpdate.machineType = res.list[0].machineType;
            this.formUpdate.os = res.list[0].os;
            this.formUpdate.note = res.list[0].note;
            this.formUpdate.na = res.list[0].na;
            this.formUpdate.status = res.list[0].status;
            this.formUpdate.vlanType = res.list[0].vlanType;
            this.formUpdate.server = res.list[0].server;
        })
    }

    updateHosting() {
        this.productService.update(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdateChange.emit(response);
            this.checkVisibleUpdate = false;
        })
    }
}