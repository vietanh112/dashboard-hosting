import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {VlanModel} from "../../../models/vlan.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard-modal-update-vlan',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdateVlan implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdateVlan: boolean = false;
    @Input() vlanUpdate: VlanModel = undefined;
    @Input() listServer: any = null;
    
    @Output() checkVisibleUpdateVlanChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    textValue: string | null = null;

    updateForm: FormGroup;
    
    ngOnInit(): void {
        this.updateForm = this.formBuilder.group({
            id: ["", [Validators.required]],
            name: ["", [Validators.required]],
            status: ['0', [Validators.required]],
            description: [''],
            server: [''],
        })
    }
    ngAfterViewInit(): void {

    }

    constructor(public productService: DashboardHostingProductService, private formBuilder: FormBuilder) {
        
    }

    handleOk(): void {
        this.updateVlan();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdateVlan = false;
        this.checkVisibleUpdateVlanChange.emit(this.checkVisibleUpdateVlan);
    }

    loadingOk():void {
        this.showVlan();
    }

    get f() {
        return this.updateForm.controls;
    }

    showVlan() {
        if(this.vlanUpdate) {
            this.f['id'].setValue(this.vlanUpdate.id);
            this.f['name'].setValue(this.vlanUpdate.name);
            this.f['status'].setValue(this.vlanUpdate.status);
            this.f['description'].setValue(this.vlanUpdate.description);
            this.f['server'].setValue(this.vlanUpdate.server);
        }
    }

    updateVlan() {
        let body = {
            id: Number(this.f['id'].value),
            name: this.f['name'].value,
            status: Number(this.f['status'].value),
            description: this.f['description'].value,
            server: Number(this.f['server'].value),
        }

        this.productService.updateVlan(body, Number(this.f['id'].value)).subscribe((response: any) => {
            this.checkVisibleUpdateVlanChange.emit(response);
            this.checkVisibleUpdateVlan = false;
        })
    }
}