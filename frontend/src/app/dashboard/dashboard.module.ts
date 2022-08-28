import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
//Components
import {DashboardListHosting} from './components/list/list.component';

//Modal
import {DashboardModalInfor} from './components/modal/infor/infor.component';
import {DashboardModalCreate} from './components/modal/create/create.component';

import {AntDesignModule} from '../shared/ant-design.module';

@NgModule({
    declarations: [
        DashboardListHosting,
        //modal
        DashboardModalInfor,
        DashboardModalCreate
    ],
    imports: [
        AntDesignModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ]
})
export class DashboardModule {

}
