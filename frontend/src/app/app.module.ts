import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
//Core components
import {CoreComponentLayout} from './_core/components/layout/layout.component';
import {CoreComponentSidebar} from './_core/components/sidebar/sidebar.component';
import {CoreComponentHeader} from './_core/components/header/header.component';
import {CoreComponentFooter} from './_core/components/footer/footer.component';

import {AntDesignModule} from './shared/ant-design.module';
//Prj components

@NgModule({
  declarations: [
    AppComponent,
    //Core Components
    CoreComponentLayout,
    CoreComponentSidebar,
    CoreComponentHeader,
    CoreComponentFooter
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
