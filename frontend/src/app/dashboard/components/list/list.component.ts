import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DashboardHostingProductService } from '../../services/hosting-product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-dashboard-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class DashboardListHosting implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() checkVisibleCreate: boolean = false;
    @Input() dataHosting: any = undefined;
    confirmModalDelete?: NzModalRef;
    searchValue = '';
    visible = false;
    sizeButton: NzButtonSize = 'large';
    listHosting: any = [];
    totalList: number = 0;
    nameHosting: string = '';
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        this.getList();
    }
    
    
  constructor(
    public productService: DashboardHostingProductService,
    private modal: NzModalService){}

    showModalInfor(data: any) {
        this.checkVisibleInfor = !this.checkVisibleInfor;
        this.dataHosting = data;
        this.nameHosting = data.ipaddress;
    }

    showModalCreate() {
        this.checkVisibleCreate = !this.checkVisibleCreate;
    }

    getList() {
      let queries = {
        page: 0,
        limit: 20
      }
      this.productService.list(queries).subscribe(res => {
        this.listHosting = res.list;
        this.totalList = res.total;
      })
      
    }
    showConfirmDelete(hostingId: any) {
        this.confirmModalDelete = this.modal.confirm({
            nzTitle: 'Do you Want to delete these items?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa Hosting khỏi danh sách',
            nzOnOk: () => {
                this.deleteItem(hostingId);
            }
          });
    }
    deleteItem (hostingId: any) {
        this.productService.delete(hostingId).subscribe((res: any) => {
            console.log(res);
            this.showNotification(res);
        })
    }
    showNotification(event: any) {
        console.log(event);
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzMask: false,
            nzTitle: `Test ${method} title`,
            nzContent: `Test content: <b>${method}</b>`,
            nzFooter: ``,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
    }
}