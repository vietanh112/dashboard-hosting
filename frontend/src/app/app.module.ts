import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
//Core components
import {DashboardComponentLayout} from './_core/components/layout/layout.component';
import {CoreComponentSidebar} from './_core/components/sidebar/sidebar.component';
import {CoreComponentHeader} from './_core/components/header/header.component';
import {CoreComponentFooter} from './_core/components/footer/footer.component';

import {AuthComponentChangePassword} from './auth/components/change-password/change-password.component';
import {AuthComponentInfor} from './auth/components/infor/infor.component';

import {AntDesignModule} from './shared/ant-design.module';

//auth
import {AuthComponentLayout} from './_core/components/layout-auth/layout.component';
import {AuthComponentHeader} from './_core/components/header-auth/header.component';

@NgModule({
  declarations: [
    AppComponent,
    //Core Components
    DashboardComponentLayout,
    CoreComponentSidebar,
    CoreComponentHeader,
    CoreComponentFooter,
    AuthComponentChangePassword,
    AuthComponentInfor,
    //auth
    AuthComponentLayout,
    AuthComponentHeader
  ],
  imports: [
    BrowserModule,
    AntDesignModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
