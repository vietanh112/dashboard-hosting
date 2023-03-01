import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
    selector: 'app-dashboard-modal-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreate implements OnInit, AfterViewInit {
    @Input() checkVisibleCreate: boolean = false;
    @Input() listServer: any = [];
    @Output() checkVisibleCreateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    createForm: FormGroup;

    searchLoading: {
        server: boolean,
        vlan: boolean,
        port: boolean,
      } = {
        server: false,
        vlan: false,
        port: false,
      }

    listVlan: any = [];
    listPort: any = [];

    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]
    
    
    constructor(public productService: DashboardHostingProductService,
                private formBuilder: FormBuilder,
                public searchService: SearchService,) {
        
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
            this.createForm.reset();
        })
    }

    loadingOk() {
        
    }
    listChange(event: any) {
        if(event) {
            this.f['port'].setValue(null);
            this.f['vlan'].setValue(null);
        }
        this.searchPort('');
        this.searchVlan('');
    }

    searchServer(value: any) {
        this.searchStr(value, 'server');
      }
  
      searchPort(value: any) {
        this.searchStr(value, 'port');
      }
  
      searchVlan(value: any) {
        this.searchStr(value, 'vlan');
      }
  
      searchStr(value: any, type: string) {
        let obj: any = {};
        if(value != null && value != undefined) {
          obj['keyword'] = value;
        }
          switch (type) {
            case "server":
              this.searchLoading.server = true;
              this.searchService.listServer(obj).subscribe(res => {
                  this.listServer = res;
                  this.searchLoading.server = false;
              })
              break;
            case "vlan":
                obj['server'] = Number(this.f['server'].value);
              this.searchLoading.vlan = true;
              this.searchService.listVlan(obj).subscribe(res => {
                  this.listVlan = res;
                  this.searchLoading.vlan = false;
              })
              break;
            case "port":
                obj['server'] = Number(this.f['server'].value);
              this.searchLoading.port = true;
              this.searchService.listPort(obj).subscribe(res => {
                  this.listPort = res;
                  this.searchLoading.port = false;
              })
              break;
            default:
              break;
          }
      }

}