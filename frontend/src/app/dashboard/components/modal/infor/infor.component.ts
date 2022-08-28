import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {HostingModel} from "../../../models/host.model";


@Component({
    selector: 'app-dashboard-modal-infor',
    templateUrl: './infor.component.html',
    styleUrls: ['./infor.component.scss']
})

export class DashboardModalInfor implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() dataHosting: any = undefined;
    @Input() nameHosting: string = '';
    @Output() checkVisibleInforChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
    }

    handleOk(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }
    
    handleCancel(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }
}