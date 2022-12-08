import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';


@Component({
    selector: 'app-dashboard-modal-create-vlan',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreateVlan implements OnInit, AfterViewInit {
    @Input() checkVisibleCreateVlan: boolean = false;
    @Input() listServer: any = [];
    @Output() checkVisibleCreateVlanChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    formCreate: any = {
        vlanName: '',
        status: '0',
        vlanInfor: '',
        server: null
    }
    textValue: string | null = null;
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: DashboardHostingProductService) {
        
    }
    
    handleOk():void {
        this.createVlan();
    }
 
    handleCancel(): void {
        this.checkVisibleCreateVlan = false;
        this.checkVisibleCreateVlanChange.emit(false);
    }

    createVlan() {
        this.productService.createVlan(this.formCreate).subscribe((response: any) => {
            this.checkVisibleCreateVlanChange.emit(response);
            this.checkVisibleCreateVlan = false;
        })
    }

    loadingOk() {
        
    }
}