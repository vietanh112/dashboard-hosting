import {Component, OnInit, AfterViewInit,Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../../_core/services/authentication.service';


@Component({
    selector: 'app-core-manage-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class AuthComponentManageList implements OnInit, AfterViewInit {
    constructor() {}
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
}