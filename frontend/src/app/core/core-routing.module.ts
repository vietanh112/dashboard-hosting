import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../_helpers/auth.interceptor';

// import { AuthGuard } from 'src/app/_helpers/auth.interceptor';
import {CoreEodList} from './eod/components/list/list.component';


export const routes: Routes = [
    {path: 'eod/list', component: CoreEodList, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
