import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";


@Component({
    selector: 'app-dashboard-modal-infor',
    templateUrl: './infor.component.html',
    styleUrls: ['./infor.component.scss']
})

export class DashboardModalInfor implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() dataHosting: any = undefined;
    @Input() nameHosting: string = '';
    @Output() checkVisibleInforChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    listVlan: any = undefined;
    vlan: any = null;
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
    }
    constructor(public productService: DashboardHostingProductService){}

    handleOk(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }
    
    handleCancel(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }

    loadingOk():void {
        let queries = {}
        this.productService.listVlan(queries).subscribe(res => {
            if(res) {
                this.listVlan = res;
                for (const element of this.listVlan) {
                    if(element.id == this.dataHosting.vlanType){
                        this.vlan = element;
                    } 
                }
            }
        })
    }
}