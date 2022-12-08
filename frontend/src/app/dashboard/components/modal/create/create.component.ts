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
    @Input() listServer: any = [];
    @Input() listVlanAll: any = [];
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
        
    }
    listVlanChange(event: any) {
        for(let item of this.listVlanAll) {
            if(item.server == event) {
                this.listVlan.push(item)
            }
        }
    }
}