import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardHostingProductService} from '../../../services/hosting-product.service';


@Component({
    selector: 'app-dashboard-modal-create-server',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class DashboardModalCreateServer implements OnInit, AfterViewInit {
    @Input() checkVisibleCreateServer: boolean = false;
    @Output() checkVisibleCreateServerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    formCreate: any = {
        serverName: '',
        status: '0',
        serverInfor: '',
    }
    listServer: any = undefined;
    textValue: string | null = null;

    status: any = [
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'},
    ]
    
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: DashboardHostingProductService) {
        
    }
    
    handleOk():void {
        this.createServer();
    }
 
    handleCancel(): void {
        this.checkVisibleCreateServer = false;
        this.checkVisibleCreateServerChange.emit(false);
    }

    createServer() {
        this.productService.createServer(this.formCreate).subscribe((response: any) => {
            this.checkVisibleCreateServerChange.emit(response);
            this.checkVisibleCreateServer = false;
        })
    }

}