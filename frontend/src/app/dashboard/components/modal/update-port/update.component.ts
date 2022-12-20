import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {PortModel} from '../../../models/port.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard-modal-update-port',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdatePort implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdatePort: boolean = false;
    @Input() port: PortModel = undefined;
    @Input() listServer: any = [];
    updateForm: FormGroup;

    
    @Output() checkVisibleUpdatePortChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    textValue: string | null = null;

    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]
    
    ngOnInit(): void {
        this.updateForm = this.formBuilder.group({
            id: ["", [Validators.required]],
            port: ["", [Validators.required]],
            status: ['0', [Validators.required]],
            description: [''],
            server: [''],
        })
    }
    ngAfterViewInit(): void {
    }

    constructor(public productService: DashboardHostingProductService,
                private formBuilder: FormBuilder,) {
        
    }

    handleOk(): void {
        this.updatePort();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdatePort = false;
        this.checkVisibleUpdatePortChange.emit(this.checkVisibleUpdatePort);
    }

    loadingOk():void {
        this.getPort();
    }

    get f() {
        return this.updateForm.controls;
    }

    getPort() {
        this.f['id'].setValue(this.port.id);
        this.f['port'].setValue(this.port.port);
        this.f['status'].setValue(this.port.status);
        this.f['description'].setValue(this.port.description);
        this.f['server'].setValue(this.port.server);
    }

    updatePort() {
        let body = {
            id: Number(this.f['id'].value),
            port: this.f['port'].value,
            status: Number(this.f['status'].value),
            description: this.f['description'].value,
            server: Number(this.f['server'].value),
        }
        this.productService.updatePort(body, Number(this.f['id'].value)).subscribe((response: any) => {
            this.checkVisibleUpdatePortChange.emit(response);
            this.checkVisibleUpdatePort = false;
        })
    }
}