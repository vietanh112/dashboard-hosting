import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DashboardHostingProductService} from '../../../services/hosting-product.service';
import {HostingModel} from "../../../models/host.model";
import { SearchService } from '../../../services/search.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard-modal-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class DashboardModalUpdate implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdate: boolean = false;
    @Input() hosting: any = {};
    @Input() listServer: any = [];
    @Input() listVlan: any = [];
    @Input() listPort: any = [];
    updateForm: FormGroup;

    @Output() checkVisibleUpdateChange: EventEmitter<boolean> = new EventEmitter<boolean>();


    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]

    searchLoading: {
      server: boolean,
      vlan: boolean,
      port: boolean,
    } = {
      server: false,
      vlan: false,
      port: false,
    }

    constructor(public productService: DashboardHostingProductService,
      public searchService: SearchService,
      private formBuilder: FormBuilder,) {
}

    ngOnInit(): void {

      this.updateForm = this.formBuilder.group({
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

    

    handleOk(): void {
        this.updateHosting();
    }

    handleCancel(): void {
        this.checkVisibleUpdate = false;
        this.checkVisibleUpdateChange.emit(this.checkVisibleUpdate);
    }

    loadingOk():void {
        this.getHosting();
        this.searchPort('');
      this.searchVlan('');
    }

    get f() {
      return this.updateForm.controls;
  }

    getHosting() {
        this.f['ipaddress'].setValue(this.hosting.ipaddress);
        this.f['ipaddressf5'].setValue(this.hosting.ipaddressf5);
        this.f['hostname'].setValue(this.hosting.hostname);
        this.f['priority'].setValue(this.hosting.priority);
        this.f['env'].setValue(this.hosting.env);
        this.f['type'].setValue(this.hosting.type);
        this.f['middleware'].setValue(this.hosting.middleware);
        this.f['information'].setValue(this.hosting.information);
        this.f['machineType'].setValue(this.hosting.machineType);
        this.f['os'].setValue(this.hosting.os);
        this.f['note'].setValue(this.hosting.note);
        this.f['na'].setValue(this.hosting.na);
        this.f['status'].setValue(this.hosting.status);
        this.f['server'].setValue(this.hosting.server);
        this.f['vlan'].setValue(this.hosting.vlan);
        this.f['port'].setValue(this.hosting.port);
        
    }

    updateHosting() {
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
        this.productService.update(body, this.hosting.id).subscribe((response: any) => {
            this.checkVisibleUpdateChange.emit(response);
            this.checkVisibleUpdate = false;
        })
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

    serverChange(value: any) {
      this.f['port'].setValue('');
      this.searchPort('');
      this.f['vlan'].setValue('');
      this.searchVlan('');      
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
            obj['server'] = this.f['server'].value;
            this.searchLoading.vlan = true;
            this.searchService.listVlan(obj).subscribe(res => {
                this.listVlan = res;
                this.searchLoading.vlan = false;
            })
            break;
          case "port":
            obj['server'] = this.f['server'].value;
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
