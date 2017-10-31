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

import { EmpleadoMasTrabajosService } from '../../servicios/movimientos/empleadoMasTrabajos.service';

declare var $: any;

@Component({
  selector: 'app-empleado-mas-trabajos',
  templateUrl: './empleadoMasTrabajos.component.html',
  styleUrls: ['./empleadoMasTrabajos.component.css']
})
export class EmpleadoMasTrabajosComponent implements OnInit {

  public consulta = {
    fechaInicio: Date,
    fechaFin: Date
  };

  public respuesta = {
    empleado: {},
    asignaciones: [],
    cantidad: Number
  }

  public exitoRespuesta: boolean = false;

  constructor( private empleadoMasTrabajosService: EmpleadoMasTrabajosService ){

  }

  ngOnInit() {
    console.log('############################################');
  }

  consultar(){
    console.log('## Consultar');

    let fechaInicio = this.consulta.fechaInicio.toString();
    let fechaFin = this.consulta.fechaFin.toString();

    let fi_formateada = this.formatearFecha(fechaInicio); // 02-02-2015
    let ff_formateada = this.formatearFecha(fechaFin); // 08-02-2015


    this.empleadoMasTrabajosService.obtenerEmpleadoMasTrabajos(fi_formateada, ff_formateada)
    .then( empleadoMasTrabajos => {

      console.log(empleadoMasTrabajos);
      if(empleadoMasTrabajos){

        this.exitoRespuesta = true;

        let personal = empleadoMasTrabajos._id.personal[0];
        let asignaciones = empleadoMasTrabajos.asignaciones;
        let cantidad = empleadoMasTrabajos.count;

        console.log(personal);
        console.log(asignaciones);
        console.log(cantidad);

        this.respuesta.empleado = personal;
        this.respuesta.cantidad = cantidad;
        this.respuesta.asignaciones = asignaciones;
      }



    })
    .catch(err => {

      console.log('Error alconsultar el empleado con mas trabajos realizados');
      console.error(err);

    })
  }

  private formatearFecha(fechaString: String){
    let fechaAux = fechaString.split('-');

    let year = fechaAux[0];
    let month = fechaAux[1];
    let day = fechaAux[2];

    let fechaFormateada = day + '-' + month + '-' + year;

    return fechaFormateada;
  }


}
