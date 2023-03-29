import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../../services/search.service';


@Component({
    selector: 'app-dashboard-modal-create-port',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreatePort implements OnInit, AfterViewInit {
    @Input() checkVisibleCreatePort: boolean = false;
    @Input() listServer: any = [];
    @Output() checkVisibleCreatePortChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    createForm: FormGroup;

    textValue: string | null = null;
    searchLoading: boolean = false;
    
    
    constructor(public productService: DashboardHostingProductService, private formBuilder: FormBuilder,
        public searchService: SearchService) {
        
    }

    ngOnInit(): void {
        this.createForm = this.formBuilder.group({
            port: ["", [Validators.required]],
            status: ['0', [Validators.required]],
            description: [''],
            server: [''],
        })
    }
    ngAfterViewInit(): void {
        
    }

    loadingOk() {
        if(this.listServer[0]?.id == null || this.listServer[0]?.name == 'All') {
            this.listServer.slice(1);
        }
    }
    
    handleOk():void {
        this.createPort();
    }
 
    handleCancel(): void {
        this.checkVisibleCreatePort = false;
        this.checkVisibleCreatePortChange.emit(false);
    }

    get f() {
        return this.createForm.controls;
    }

    createPort() {
        let body = {
            port: this.f['port'].value,
            status: Number(this.f['status'].value),
            description: this.f['description'].value,
            server: Number(this.f['server'].value),
        }
        this.productService.createPort(body).subscribe((response: any) => {
            this.checkVisibleCreatePortChange.emit(response);
            this.checkVisibleCreatePort = false;
            this.createForm.reset();
        })
    }
    

    searchServer(value: any) {
        this.searchLoading = true;
        this.searchService.listServer({keyword: value}).subscribe(res => {
            this.listServer = res;
            this.searchLoading = false;
        })
    }

}