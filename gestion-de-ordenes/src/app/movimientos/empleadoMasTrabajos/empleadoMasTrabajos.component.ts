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

  public ordenSeleccionada = null;
  public trabajoSeleccionado = null;
  public documentoSeleccionado = null;
  ngOnInit() {
  }

  OnTrabajoSeleccionado(trabajo){
    console.log('trabajo: ');
    console.log(trabajo);
    this.trabajoSeleccionado = trabajo;
    this.abrirTerceroTab();
  }
  OnOrdenSeleccionada(orden){
    console.log('orden: ');
    console.log(orden);
    this.ordenSeleccionada = orden;
    this.abrirSegundoTab();
  }
  OnDocumentoSeleccionado(documento){
    console.log('documento: ');
    console.log(documento);
    this.documentoSeleccionado = documento;
    this.abrirCuartoTab();
  }

  abrirSegundoTab(){
    console.log('$(".active")');
    console.log($(".active"));
    $("#segundo a").click();
    // $(".active").removeClass('active');
    // $("#primero a").attr("aria-expanded","false");
    // $("#segundo").addClass('active');
    // $("#segundo a").attr("aria-expanded","true");
    // $("#segundo").tab('show');
  }
  abrirTerceroTab(){
    console.log('$(".active")');
    console.log($(".active"));
    $("#tercero a").click();
  }
  abrirCuartoTab(){
    console.log('$(".active")');
    console.log($(".active"));
    $("#cuarto a").click();
  }
  abrirPrimerTab(){
    console.log('$(".active")');
    console.log($(".active"));
    $("#primero a").click();
  }
}
