import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
// import { AuthGuard } from 'src/app/_helpers/auth.interceptor';
import {DashboardListHosting} from './components/list/list.component';
import {DashboardListVlan} from './components/list/vlan/list.component';
import {DashboardListServer} from './components/list/server/list.component';

export const routes: Routes = [
    {path: 'list/uat', component: DashboardListHosting},
    {path: 'list/product', component: DashboardListHosting},
    {path: 'list/vlan', component: DashboardListVlan},
    {path: 'list/server', component: DashboardListServer}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
