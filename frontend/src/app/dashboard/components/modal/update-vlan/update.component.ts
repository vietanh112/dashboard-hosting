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
    @Input() idUpdate: string = null;
    formUpdate: any = {
        id: '',
        vlanName: '',
        status: null,
        vlanInfor: '',
        server: null
    };
    @Output() checkVisibleUpdateVlanChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    listServer: any = undefined;
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
        this.getVlan();
        let queries = {}
        this.productService.listServer(queries).subscribe(res => {
            if(res) {
                this.listServer = res;
            }
        })
    }
    getVlan() {
        let queries = {
            id: this.idUpdate
        }
        this.productService.listVlan(queries).subscribe(res => {
            if(res) {
                this.formUpdate.id = res[0].id;
                this.formUpdate.vlanName = res[0].vlanName;
                this.formUpdate.status = res[0].status;
                this.formUpdate.vlanInfor = res[0].vlanInfor;
                this.formUpdate.server = res[0].server;
            }
        })
    }

    updateVlan() {
        this.productService.updateVlan(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdateVlanChange.emit(response);
            this.checkVisibleUpdateVlan = false;
        })
    }
}