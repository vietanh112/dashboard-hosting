import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";


@Component({
    selector: 'app-dashboard-modal-update-vlan',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdateVlan implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdateVlan: boolean = false;
    @Input() vlanUpdate: any = null;
    @Input() listServer: any = null;
    formUpdate: any = {
        id: '',
        vlanName: '',
        status: null,
        vlanInfor: '',
        server: null
    };
    @Output() checkVisibleUpdateVlanChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    textValue: string | null = null;
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {

    }

    constructor(public productService: DashboardHostingProductService) {
        
    }

    handleOk(): void {
        this.updateVlan();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdateVlan = false;
        this.checkVisibleUpdateVlanChange.emit(this.checkVisibleUpdateVlan);
    }

    loadingOk():void {
        this.showVlan();
    }
    showVlan() {
        if(this.vlanUpdate) {
            this.formUpdate.id = this.vlanUpdate.id;
            this.formUpdate.vlanName = this.vlanUpdate.vlanName;
            this.formUpdate.status = this.vlanUpdate.status;
            this.formUpdate.vlanInfor = this.vlanUpdate.vlanInfor;
            this.formUpdate.server = this.vlanUpdate.server;
        }
    }

    updateVlan() {
        this.productService.updateVlan(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdateVlanChange.emit(response);
            this.checkVisibleUpdateVlan = false;
        })
    }
}