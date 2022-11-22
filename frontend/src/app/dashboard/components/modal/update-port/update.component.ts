import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';

@Component({
    selector: 'app-dashboard-modal-update-port',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdatePort implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdatePort: boolean = false;
    @Input() idUpdate: string = null;
    formUpdate: any = {
        id: null,
        port: '',
        status: null,
        ipAddress: '',
        description: '',
        server: null,
    };
    @Output() checkVisibleUpdatePortChange: EventEmitter<boolean> = new EventEmitter<boolean>();
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
        let queries = {
            id: this.idUpdate
        }
        this.productService.listPort(queries).subscribe(res => {
            if(res) {
                this.formUpdate.id = res[0].id;
                this.formUpdate.port = res[0].port;
                this.formUpdate.status = res[0].status;
                this.formUpdate.ipAddress = res[0].ipAddress;
                this.formUpdate.description = res[0].description;
                this.formUpdate.server = res[0].server;
            }
        })
    }

    updateVlan() {
        this.productService.updatePort(this.formUpdate, this.formUpdate.id).subscribe((response: any) => {
            this.checkVisibleUpdatePortChange.emit(response);
            this.checkVisibleUpdatePort = false;
        })
    }
}