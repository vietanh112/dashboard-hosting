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
        vlanType: '',
        vlanTypeInfor: ''
    }
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: DashboardHostingProductService) {
        
    }

    handleOk(): void {
        this.checkVisibleCreate = false;
        this.createHosting();
    }
    
    handleCancel(): void {
        this.checkVisibleCreate = false;
        this.checkVisibleCreateChange.emit(this.checkVisibleCreate);
    }
    createHosting() {
        console.log(this.formCreate);
        this.productService.create(this.formCreate).subscribe((response: any) => {
            this.checkVisibleCreateChange.emit(response);
        })
    }
}