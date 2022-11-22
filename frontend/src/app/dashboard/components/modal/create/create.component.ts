import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';


@Component({
    selector: 'app-dashboard-modal-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreate implements OnInit, AfterViewInit {
    @Input() checkVisibleCreate: boolean = false;
    @Output() checkVisibleCreateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    formCreate: any = {
        ipaddress: '',
        ipaddressf5: '',
        hostname: '',
        priority: '',
        env: '',
        type: '',
        middleware: '',
        information: '',
        machineType: '',
        os: '',
        note: '',
        na: '',
        status: null,
        vlanType: null,
        server: null
    }
    listVlan: any = [];
    listServer: any = [];
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: DashboardHostingProductService) {
        
    }
    
    handleOk():void {
        this.createHosting();
    }
 
    handleCancel(): void {
        this.checkVisibleCreate = false;
        this.checkVisibleCreateChange.emit(false);
    }

    createHosting() {
        this.productService.create(this.formCreate).subscribe((response: any) => {
            this.checkVisibleCreateChange.emit(response);
            this.checkVisibleCreate = false;
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
    listVlanChange(event: any) {
        let queries = {
            server: event
        }
        this.productService.listVlan(queries).subscribe(res => {
            if(res) {
                this.listVlan = res;
            }
        })
    }
}