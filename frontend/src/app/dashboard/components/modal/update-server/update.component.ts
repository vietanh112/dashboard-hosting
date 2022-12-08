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
    @Input() dataServer: any = {};
    formUpdate: any = {
        id: '',
        serverName: '',
        status: null,
        serverInfor: '',
    };
    @Output() checkVisibleUpdateServerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    textValue: string | null = null;

    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]
    
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
        this.showServer();
    };

    showServer() {
        this.formUpdate.id = this.dataServer.id;
        this.formUpdate.serverName = this.dataServer.serverName;
        this.formUpdate.status = String(this.dataServer.status);
        this.formUpdate.serverInfor = this.dataServer.serverInfor;
    }

    updateServer() {
        this.productService.updateServer(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdateServerChange.emit(response);
            this.checkVisibleUpdateServer = false;
        })
    }
}