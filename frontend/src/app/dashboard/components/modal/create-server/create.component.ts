import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-dashboard-modal-create-server',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreateServer implements OnInit, AfterViewInit {
    @Input() checkVisibleCreateServer: boolean = false;
    @Output() checkVisibleCreateServerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    createForm: FormGroup
    listServer: any = undefined;
    textValue: string | null = null;

    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]
    
    constructor(public productService: DashboardHostingProductService, private formBuilder: FormBuilder,) {
        
    }
    
    ngOnInit(): void {
        this.createForm = this.formBuilder.group({
            name: ["", [Validators.required]],
            status: ['0', [Validators.required]],
            description: [''],
        })
    }
    ngAfterViewInit(): void {
        
    }

    handleOk():void {
        this.createServer();
    }
 
    handleCancel(): void {
        this.checkVisibleCreateServer = false;
        this.checkVisibleCreateServerChange.emit(false);
    }

    get f() {
        return this.createForm.controls;
    }

    createServer() {
        let body = {
            name: this.f['name'].value,
            status: Number(this.f['status'].value),
            description: this.f['description'].value
        }
        this.productService.createServer(body).subscribe((response: any) => {
            this.checkVisibleCreateServerChange.emit(response);
            this.checkVisibleCreateServer = false;
            this.createForm.reset();
        })
    }

}