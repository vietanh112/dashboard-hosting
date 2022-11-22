import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";


@Component({
    selector: 'app-dashboard-modal-update-server',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdateServer implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdateServer: boolean = false;
    @Input() idUpdate: string = null;
    formUpdate: any = {
        id: '',
        serverName: '',
        status: null,
        serverInfor: '',
    };
    @Output() checkVisibleUpdateServerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    textValue: string | null = null;
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
    }

    constructor(public productService: DashboardHostingProductService) {
        
    }

    handleOk(): void {
        this.updateServer();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdateServer = false;
        this.checkVisibleUpdateServerChange.emit(false);
    }

    loadingOk():void {
        this.getServer();
    }
    getServer() {
        let queries = {
            id: this.idUpdate
        }
        this.productService.listServer(queries).subscribe(res => {
            this.formUpdate.id = res[0].id;
            this.formUpdate.serverName = res[0].serverName;
            this.formUpdate.status = res[0].status;
            this.formUpdate.serverInfor = res[0].serverInfor;
        })
    }

    updateServer() {
        this.productService.updateServer(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdateServerChange.emit(response);
            this.checkVisibleUpdateServer = false;
        })
    }
}