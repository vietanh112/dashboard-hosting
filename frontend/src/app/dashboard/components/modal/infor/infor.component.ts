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

    }


}
