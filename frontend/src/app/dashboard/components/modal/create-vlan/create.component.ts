import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard-modal-create-vlan',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreateVlan implements OnInit, AfterViewInit {
    @Input() checkVisibleCreateVlan: boolean = false;
    @Input() listServer: any = [];
    @Output() checkVisibleCreateVlanChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    createForm: FormGroup;
    textValue: string | null = null;
    
    ngOnInit(): void {
        this.createForm = this.formBuilder.group({
            name: ["", [Validators.required]],
            status: ['0', [Validators.required]],
            description: [''],
            server: ['']
        })
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: DashboardHostingProductService, private formBuilder: FormBuilder) {
        
    }
    
    handleOk():void {
        this.createVlan();
    }
 
    handleCancel(): void {
        this.checkVisibleCreateVlan = false;
        this.checkVisibleCreateVlanChange.emit(false);
    }

    get f() {
        return this.createForm.controls;
    }

    createVlan() {
        let body = {
            name: this.f['name'].value,
            status: Number(this.f['status'].value),
            description: this.f['description'].value,
            server: Number(this.f['server'].value)
        }

        this.productService.createVlan(body).subscribe((response: any) => {
            this.checkVisibleCreateVlanChange.emit(response);
            this.checkVisibleCreateVlan = false;
            this.createForm.reset();
        })
    }

    loadingOk() {
        
    }
}