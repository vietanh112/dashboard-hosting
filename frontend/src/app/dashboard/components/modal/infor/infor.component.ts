import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";


@Component({
    selector: 'app-dashboard-modal-infor',
    templateUrl: './infor.component.html',
    styleUrls: ['./infor.component.scss']
})

export class DashboardModalInfor implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() dataHosting: any = {};
    @Input() listVlan: any = [];
    @Input() listPort: any = [];
    @Input() listServer: any = [];
    @Output() checkVisibleInforChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    status: any = [
        {id: '-1', color: 'red', name: 'Error'},
        {id: '0', color: 'orange', name: 'Stop'},
        {id: '1', color: 'green', name: 'Active'},
    ]

    infor: {
        vlan: string,
        port: string,
        server: string
    } = {
        vlan: null,
        port: null,
        server: null
    }
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
    }
    constructor(public productService: DashboardHostingProductService){}

    handleOk(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }
    
    handleCancel(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }

    loadingOk():void {
        this.takeServer();
        this.takePort();
        this.takeVlan();
    }

    takeVlan() {
        for(let item of this.listVlan) {
            if(item.id == Number(this.dataHosting.vlan)) {
                this.infor.vlan = item.name;
                return
            }
        }
    }

    takeServer() {
        for(let item of this.listServer) {
            if(item.id == Number(this.dataHosting.server)) {
                this.infor.server = item.name;
                return
            }
        }
    }

    takePort() {
        for(let item of this.listPort) {
            if(item.id == String(this.dataHosting.port)) {
                this.infor.port = item.port;
                return
            }
        }
    }
}