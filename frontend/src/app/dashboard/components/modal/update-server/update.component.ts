import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {ServerModel} from "../../../models/server.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard-modal-update-server',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdateServer implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdateServer: boolean = false;
    @Input() dataServer: ServerModel = undefined;
    @Output() checkVisibleUpdateServerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    updateForm: FormGroup;
    textValue: string | null = null;

    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]

    constructor(public productService: DashboardHostingProductService, private formBuilder: FormBuilder) {
        
    }

    ngOnInit(): void {
        this.updateForm = this.formBuilder.group({
            id: ["", [Validators.required]],
            name: ["", [Validators.required]],
            status: ['0', [Validators.required]],
            description: [''],
        })
    }
    ngAfterViewInit(): void {
    }

    handleOk(): void {
        this.updateServer();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdateServer = false;
        this.checkVisibleUpdateServerChange.emit(false);
    }

    loadingOk():void {
        this.showServer();
    };

    get f() {
        return this.updateForm.controls;
    }

    showServer() {
        this.f['id'].setValue(this.dataServer.id);
        this.f['name'].setValue(this.dataServer.name);
        this.f['status'].setValue(this.dataServer.status);
        this.f['description'].setValue(this.dataServer.description);
    }

    updateServer() {
        let body = {
            name: this.f['name'].value,
            status: Number(this.f['status'].value),
            description: this.f['description'].value
        }
        this.productService.updateServer(body, Number(this.f['id'].value)).subscribe((response: any) => {
            this.checkVisibleUpdateServerChange.emit(response);
            this.checkVisibleUpdateServer = false;
        })
    }
}