import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';


@Component({
    selector: 'app-dashboard-modal-create-port',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreatePort implements OnInit, AfterViewInit {
    @Input() checkVisibleCreatePort: boolean = false;
    @Output() checkVisibleCreatePortChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    formCreate: any = {
        port: '',
        status: null,
        ipAddress: '',
        description: null,
        server: null
    }
    listServer: any = undefined;
    textValue: string | null = null;
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: DashboardHostingProductService) {
        
    }
    
    handleOk():void {
        this.createPort();
    }
 
    handleCancel(): void {
        this.checkVisibleCreatePort = false;
        this.checkVisibleCreatePortChange.emit(false);
    }

    createPort() {
        this.productService.createPort(this.formCreate).subscribe((response: any) => {
            this.checkVisibleCreatePortChange.emit(response);
            this.checkVisibleCreatePort = false;
        })
    }

    loadingOk() {
        let queries = {}
        this.productService.listServer(queries).subscribe(res => {
            if(res) {
                this.listServer = res;
            }
        })
    }
}