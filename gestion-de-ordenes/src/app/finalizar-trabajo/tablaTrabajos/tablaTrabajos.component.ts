import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

import {SelectionModel} from '@angular/cdk/collections';

//Para ordenar la tabla
import {MdSort} from '@angular/material';

//Para paginar la tabla
import {MdPaginator} from '@angular/material';


import { TrabajosService } from '../../servicios/trabajos.service';
import { Trabajo } from '../../modelos/trabajo';

@Component({
  selector: 'app-tabla-trabajos',
  templateUrl: './tablaTrabajos.component.html',
  styleUrls: ['./tablaTrabajos.component.css']
})
export class TablaTrabajosComponent implements OnInit {

  @Output() trabajoSeleccionado = new EventEmitter();
  @Output() volverStep = new EventEmitter();

  @Input() ordenSeleccionada;

  displayedColumns = ['numTrabajo', 'fechaRealizacion', 'cuilSupervisor'];
  exampleDatabase : ExampleDatabase;
  dataSource: ExampleDataSource | null;

  selection = new SelectionModel<string>(true, []);

  seleccionado = {
    'id' : ''
  };

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private trabajosService: TrabajosService){
        this.exampleDatabase = new ExampleDatabase(trabajosService);
  }


  ngOnChanges(){
    console.log("Cambieee");

    if (this.ordenSeleccionada!=null) {
      this.exampleDatabase.obtenerTrabajosOrden(this.ordenSeleccionada.numOrden);
    }
  }

  rowClick(row){
    // console.log('Tocaron!!!');
    // console.log(row);
    row.seleccionada = !row.seleccionada;

    this.seleccionado = row;
  }

  siguiente(){
    // console.log(this.seleccionado);
    this.trabajoSeleccionado.next(this.seleccionado);
  }

  volver(){
    this.volverStep.next();
  }

  ngOnInit() {


    this.seleccionado = {
      'id' : ''
    };
    // console.log(this.seleccionado);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      // console.log('Entre aca');
      if (!this.dataSource) {
        // console.log('No tengo dataSource!!');
        return; }
        else{

          let valorFiltro = this.filter.nativeElement.value;

          //Si empieza con 0, debemos quitarselo
          // if(valorFiltro){
          //   // console.log(valorFiltro[0]);
          //   if(valorFiltro[0] == '0'){
          //     valorFiltro = valorFiltro.slice(1);
          //     console.log(valorFiltro);
          //   }
          // }

          if(this.dataSource.filter){
            // console.log('Tengo Filtro!')
          }
          this.dataSource.filter = valorFiltro;
        }
      });
    }

    //**************************************************************************
    //Metodos para seleccion (no estan en uso actualmente)
    isAllSelected(): boolean {
      if (!this.dataSource) { return false; }
      if (this.selection.isEmpty()) { return false; }

      if (this.filter.nativeElement.value) {
        return this.selection.selected.length == this.dataSource.renderedData.length;
      } else {
        return this.selection.selected.length == this.exampleDatabase.data.length;
      }
    }

    masterToggle() {
      if (!this.dataSource) { return; }

      if (this.isAllSelected()) {
        this.selection.clear();
      } else if (this.filter.nativeElement.value) {
        this.dataSource.renderedData.forEach(data => this.selection.select(data.numTrabajo));
      } else {
        this.exampleDatabase.data.forEach(data => this.selection.select(data.numTrabajo));
      }
    }
  }


  //****************************************************************************

  /**
    Base de datos para la tabla.
  */
  export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] { return this.dataChange.value; }


    constructor(private trabajoService: TrabajosService) {
      // this.trabajoService.getTrabajos().then(
      //   trabajos =>{
      //     this.setTrabajos(trabajos);
      //   }
      // ).catch(err => {console.log(err)})
    }

    obtenerTrabajosOrden(numOrden){
      this.trabajoService.getTrabajosDeOrden(numOrden).then(
        trabajos =>{
          this.setTrabajos(trabajos);
        }
      ).catch(err => {console.log(err)})
    }

    /**
      Pasamos nuestros trabajos al observer
    */
    setTrabajos(trabajosExample: any[]) {
      let copiedData = trabajosExample;
      this.dataChange.next(trabajosExample);

    }


  }


  //****************************************************************************

  /**
    Esta clase solo se encarga de hacer el renderizado de la tabla,
    basandose en los datos de ExampleDatabase.
  */
  export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }


    filteredData: Trabajo[] = [];
    renderedData: Trabajo[] = [];

    constructor(private _exampleDatabase: ExampleDatabase,  private _sort: MdSort,  private _paginator: MdPaginator) {
      super();
    }

    /**
      Esta funcion es llamada por la tabla para buscar el stream de datos para renderizar.
    */
    connect(): Observable<Trabajo[]> {
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._filterChange,
        this._sort.mdSortChange,
        this._paginator.page
      ];

      return Observable.merge(...displayDataChanges).map(() => {
        // console.log(displayDataChanges);

        //Preparamos el FILTRO de la tabla
        this.filteredData =   this._exampleDatabase.data.slice().filter((item: Trabajo) => {

          // Filtro de la fecha
          // console.log(item.fechaRealizacion);
          let nDate = new Date(item.fechaRealizacion);
          let dia = nDate.getDate();
          let diaString = dia.toString();
          if(dia < 10){
            diaString = '0'+ dia.toString();
          }
          let mes = nDate.getMonth()+1;
          let mesString = mes.toString();
          if(mes < 10){
            mesString = '0'+ mes.toString();
          }

          let filtroFecha = diaString + '/' + mesString +  '/' + nDate.getFullYear();

          // Concatenamos los filtros para armar el string de busqueda
          let searchStr = (item.numTrabajo + filtroFecha + item.cuilSupervisor).toLowerCase();

          return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        });

        // Ordenamiento de datos
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);


        return this.renderedData;
      });
    }

    disconnect() {}

    /**
    Retorna una copia ordenada de los datos.
    */
    sortData(data: Trabajo[]): Trabajo[] {
      if (!this._sort.active || this._sort.direction == '') { return data; }

      return data.sort((a, b) => {
        let propertyA: number|string = '';
        let propertyB: number|string = '';

        switch (this._sort.active) {
          case 'numTrabajo': [propertyA, propertyB] = [a.numTrabajo, b.numTrabajo]; break;
          case 'fechaRealizacion': [propertyA, propertyB] = [a.fechaRealizacion.getTime(), b.fechaRealizacion.getTime()]; break;
          case 'cuilSupervisor': [propertyA, propertyB] = [a.cuilSupervisor, b.cuilSupervisor]; break;
        }

        let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
      });
    }
  }
