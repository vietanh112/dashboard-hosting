import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
//Components
import {AuthComponentLogin} from './components/login/login.component';
import {AuthComponentLogout} from './components/logout/logout.component';
import {AuthComponentRegister} from './components/register/register.component';
import {AuthComponentForgotPassword} from './components/forgot-password/forgot-password.component';
import  {AuthComponentManage} from './components/manage/list.component';
//Modal

import {AntDesignModule} from '../shared/ant-design.module';

@NgModule({
    declarations: [
        AuthComponentLogin,
        AuthComponentLogout,
        AuthComponentRegister,
        AuthComponentForgotPassword,
        AuthComponentManage
    ],
    imports: [
        AntDesignModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ]
})
export class AuthModule {

}
