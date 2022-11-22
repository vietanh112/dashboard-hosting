import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../_helpers/auth.interceptor';

// import { AuthGuard } from 'src/app/_helpers/auth.interceptor';
import {DashboardListHosting} from './components/list/list.component';
import {DashboardListVlan} from './components/list/vlan/list.component';
import {DashboardListServer} from './components/list/server/list.component';
import {DashboardListPort} from './components/list/port/list.component';

export const routes: Routes = [
    {path: 'hosting/list', component: DashboardListHosting, canActivate: [AuthGuard]},
    {path: 'vlan/list', component: DashboardListVlan, canActivate: [AuthGuard]},
    {path: 'server/list', component: DashboardListServer, canActivate: [AuthGuard]},
    {path: 'port/list', component: DashboardListPort, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
