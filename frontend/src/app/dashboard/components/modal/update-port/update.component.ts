import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';

@Component({
    selector: 'app-dashboard-modal-update-port',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdatePort implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdatePort: boolean = false;
    @Input() portUpdate: any = {};
    @Input() listServer: any = [];
    formUpdate: any = {
        id: null,
        port: '',
        status: null,
        ipAddress: '',
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
        let queries = {}
        this.productService.listServer(queries).subscribe(res => {
            if(res) {
                this.listServer = res;
            }
        })
    }
    getPort() {
        this.formUpdate.id = this.portUpdate.id;
        this.formUpdate.port = this.portUpdate.port;
        this.formUpdate.status = this.portUpdate.status;
        this.formUpdate.ipAddress = this.portUpdate.ipAddress;
        this.formUpdate.description = this.portUpdate.description;
        this.formUpdate.server = this.portUpdate.server;
    }

    updateVlan() {
        this.productService.updatePort(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdatePortChange.emit(response);
            this.checkVisibleUpdatePort = false;
        })
    }
}