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
    @Output() checkVisibleCreateVlanChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    formCreate: any = {
        vlanName: null,
        vlanInfor: '',
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
        let queries = {}
        this.productService.listServer(queries).subscribe(res => {
            if(res) {
                this.listServer = res;
            }
        })
    }
}