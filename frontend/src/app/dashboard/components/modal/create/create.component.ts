import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-dashboard-modal-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreate implements OnInit, AfterViewInit {
    @Input() checkVisibleCreate: boolean = false;
    @Input() listServer: any = [];
    @Input() listVlanAll: any = [];
    @Input() listPortAll: any = [];
    @Output() checkVisibleCreateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    createForm: FormGroup;


    listVlan: any = [];
    listPort: any = [];
    
    
    constructor(public productService: DashboardHostingProductService,
                private formBuilder: FormBuilder,) {
        
    }

    ngOnInit(): void {
        this.createForm = this.formBuilder.group({
            ipaddress: ["", [Validators.required]],
            ipaddressf5: [""],
            hostname: [""],
            port: [null, [Validators.required]],
            priority: [""],
            env: [""],
            type: [''],
            middleware: [''],
            information: [''],
            machineType: [''],
            os: [""],
            note: [""],
            na: [""],
            status: ['0', [Validators.required]],
            server: [null, [Validators.required]],
            vlan: [null, [Validators.required]],
        })
    }
    ngAfterViewInit(): void {
        
    }
    
    handleOk():void {
        this.createHosting();
    }
 
    handleCancel(): void {
        this.checkVisibleCreate = false;
        this.checkVisibleCreateChange.emit(false);
    }

    get f() {
        return this.createForm.controls;
    }

    createHosting() {
        let body = {
            ipaddress: this.f['ipaddress'].value,
            ipaddressf5: this.f['ipaddressf5'].value,
            hostname: this.f['hostname'].value,
            port: Number(this.f['port'].value),
            priority: this.f['priority'].value,
            env: this.f['env'].value,
            type: this.f['type'].value,
            middleware: this.f['middleware'].value,
            information: this.f['information'].value,
            machineType: this.f['machineType'].value,
            os: this.f['os'].value,
            note: this.f['note'].value,
            na: this.f['na'].value,
            status: Number(this.f['status'].value),
            vlan: Number(this.f['vlan'].value),
            server: Number(this.f['server'].value)
        }
        this.productService.create(body).subscribe((response: any) => {
            this.checkVisibleCreateChange.emit(response);
            this.checkVisibleCreate = false;
        })
    }

    loadingOk() {
        
    }
    listChange(event: any) {
        for(let item of this.listVlanAll) {
            if(item.server == event) {
                this.listVlan.push(item)
            }
        }
        for(let item of this.listPortAll) {
            if(item.server == event) {
                this.listPort.push(item)
            }
        }
    }
}