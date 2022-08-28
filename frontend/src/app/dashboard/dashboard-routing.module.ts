import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import { AuthGuard } from 'src/app/_helpers/auth.interceptor';
import {DashboardListHosting} from './components/list/list.component';

export const routes: Routes = [
    {path: 'list', component: DashboardListHosting},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
