import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../_helpers/auth.interceptor';
//Components
import {AuthComponentLogin} from './components/login/login.component';
import {AuthComponentLogout} from './components/logout/logout.component';
import {AuthComponentRegister} from './components/register/register.component';
import {AuthComponentForgotPassword} from './components/forgot-password/forgot-password.component';
import  {AuthComponentManageList} from './components/manage/list.component';

export const routes: Routes = [
    {path: 'auth/login', component: AuthComponentLogin},
    {path: 'auth/logout', component: AuthComponentLogout, canActivate: [AuthGuard]},
    {path: 'auth/register', component: AuthComponentRegister},
    {path: 'auth/forgot-password', component: AuthComponentForgotPassword},
    {path: 'auth/manage', component: AuthComponentManageList}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
