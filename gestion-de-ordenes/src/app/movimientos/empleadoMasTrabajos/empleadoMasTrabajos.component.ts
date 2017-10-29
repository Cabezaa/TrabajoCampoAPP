import { Component, OnInit } from '@angular/core';

//Para el data table
import { ElementRef, ViewChild } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

declare var $: any;

@Component({
  selector: 'app-empleado-mas-trabajos',
  templateUrl: './empleadoMasTrabajos.component.html',
  styleUrls: ['./empleadoMasTrabajos.component.css']
})
export class EmpleadoMasTrabajosComponent implements OnInit {


  ngOnInit() {
    console.log('############################################');
  }


}
