import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {PortModel} from '../../../models/port.model';

@Component({
    selector: 'app-dashboard-modal-update-port',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdatePort implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdatePort: boolean = false;
    @Input() port: PortModel = undefined;
    @Input() listServer: any = [];
    formUpdate: any = {
        id: null,
        port: '',
        status: null,
        description: '',
        server: null,
    };
    @Output() checkVisibleUpdatePortChange: EventEmitter<boolean> = new EventEmitter<boolean>();
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
        this.updateVlan();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdatePort = false;
        this.checkVisibleUpdatePortChange.emit(this.checkVisibleUpdatePort);
    }

    loadingOk():void {
        this.getPort();
        
    }

    getPort() {
        this.formUpdate.id = this.port.id;
        this.formUpdate.port = this.port.port;
        this.formUpdate.status = this.port.status;
        this.formUpdate.description = this.port.description;
        this.formUpdate.server = this.port.server;
    }

    updateVlan() {
        this.productService.updatePort(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdatePortChange.emit(response);
            this.checkVisibleUpdatePort = false;
        })
    }
}