import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreRoutingModule} from './core-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
//Components
import {CoreEodList} from './eod/components/list/list.component';

//Modal

import {AntDesignModule} from '../shared/ant-design.module';


@NgModule({
    declarations: [
        CoreEodList,
        //modal
        
    ],
    imports: [
        AntDesignModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreRoutingModule,
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ]
})
export class CoreModule {

}
