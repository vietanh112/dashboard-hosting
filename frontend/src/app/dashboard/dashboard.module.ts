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
import {DashboardModalUpdate} from './components/modal/update/update.component';
import {DashboardListVlan} from './components/list/vlan/list.component';
import {DashboardModalUpdateVlan} from './components/modal/update-vlan/update.component';
import {DashboardModalCreateVlan} from './components/modal/create-vlan/create.component';
import {DashboardListServer} from './components/list/server/list.component';
import {DashboardModalCreateServer} from './components/modal/create-server/create.component';
import {DashboardModalUpdateServer} from './components/modal/update-server/update.component';
import {AntDesignModule} from '../shared/ant-design.module';

@NgModule({
    declarations: [
        DashboardListHosting,
        //modal
        DashboardModalInfor,
        DashboardModalCreate,
        DashboardModalUpdate,
        DashboardListVlan,
        DashboardModalCreateVlan,
        DashboardModalUpdateVlan,
        DashboardListServer,
        DashboardModalCreateServer,
        DashboardModalUpdateServer
        
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
