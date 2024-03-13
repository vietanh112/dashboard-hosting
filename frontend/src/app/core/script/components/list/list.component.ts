import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../../_core/services/authentication.service';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
    selector: 'app-dashboard-list-server-server',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class CoreScriptList implements OnInit, AfterViewInit {
    loadingState: boolean = false;

    status: any = [
        {id: null, name: 'All'},
        {id: '-1', name: 'Error'},
        {id: '0', name: 'Stop'},
        {id: '1', name: 'Active'}
    ]

    constructor(
        private modal: NzModalService,
        private location: Location,
        private router: Router,
        private authenticationService: AuthenticationService,
        public activatedRoute: ActivatedRoute,
    ){
        this.activatedRoute.queryParams.subscribe(params => {
            // this.routeParams = params;
            // if (typeof (params['keyword']) !== 'undefined') {
            //     this.search.keyword = decodeURIComponent(params['keyword']);
            // }
            // if (typeof (params['status']) !== 'undefined') {
            //     this.search.status = params['status'];
            // }
            // if (typeof (params['page']) !== 'undefined') {
            //     this.page = params['page'];
            // }
            // if (typeof (params['limit']) !== 'undefined') {
            //     this.limit = params['limit'];
            // }
        })
    }
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.createChartColumn();
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      private createChartColumn(): void {
        let date = new Date();
        const data: any[] = [];
    
        for (let i = 0; i < 10; i++) {
          date.setDate(new Date().getDate() + i);
          data.push({
            name: `${date.getDate()}/${date.getMonth() + 1}`,
            y: this.getRandomNumber(0, 1000),
          });
        }
    
        const chart = Highcharts.chart('chart-column' as any, {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Column Chart',
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
          },
          yAxis: {
            min: 0,
            title: undefined,
          },
          xAxis: {
            type: 'category',
          },
          tooltip: {
            headerFormat: `<div>Date: {point.key}</div>`,
            pointFormat: `<div>{series.name}: {point.y}</div>`,
            shared: true,
            useHTML: true,
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
              },
            },
          },
          series: [{
            name: 'Amount',
            data,
          }],
        } as any);
    
        
      }
}
