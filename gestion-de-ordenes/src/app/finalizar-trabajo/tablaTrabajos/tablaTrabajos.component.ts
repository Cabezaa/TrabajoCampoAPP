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

//Para ordenar la tabla
import {MdSort} from '@angular/material';

@Component({
  selector: 'app-tabla-trabajos',
  templateUrl: './tablaTrabajos.component.html',
  styleUrls: ['./tablaTrabajos.component.css']
})
export class TablaTrabajosComponent implements OnInit {

  @Output() trabajoSeleccionado = new EventEmitter();
  @Input() ordenSeleccionada;

  displayedColumns = ['numTrabajo', 'fechaRealizacion', 'cuilSupervisor'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  seleccionado = {
    'id' : ''
  };

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdSort) sort: MdSort;

  rowClick(row){
    // console.log('Tocaron!!!');
    // console.log(row);
    row.seleccionada = !row.seleccionada;

    this.seleccionado = row;
  }

  siguiente(){
    console.log(this.seleccionado);
    this.trabajoSeleccionado.next(this.seleccionado);
  }

  ngOnInit() {
    this.seleccionado = {
      'id' : ''
    };
    console.log(this.seleccionado);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
}

export interface Trabajo {
 numTrabajo: string;
 fechaRealizacion: Date;
 Evaluacion: string;
 observaciones: string;
 numOrden: string;
 idTipoTrabajo: string;
 cuilSupervisor: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Trabajo[]> = new BehaviorSubject<Trabajo[]>([]);
  get data(): Trabajo[] { return this.dataChange.value; }



  constructor() {
    // Fill up the database with 100 users.
    // for (let i = 0; i < 5; i++) { this.addUser(); }
    this.setTrabajos();
  }

  public trabajos = [
{
  numTrabajo: '1',
  fechaRealizacion: new Date('01-09-2017'),
  Evaluacion: '',
  observaciones: '',
  numOrden: '1',
  idTipoTrabajo: '1',
  cuilSupervisor: '400'
},
{
  numTrabajo: '2',
  fechaRealizacion: new Date('01-09-2017'),
  Evaluacion: '',
  observaciones: '',
  numOrden: '1',
  idTipoTrabajo: '2',
  cuilSupervisor: '400'
},
{
  numTrabajo: '3',
  fechaRealizacion: new Date('01-09-2017'),
  Evaluacion: '',
  observaciones: '',
  numOrden: '2',
  idTipoTrabajo: '1',
  cuilSupervisor: '500'
},
{
  numTrabajo: '4',
  fechaRealizacion: new Date('01-09-2017'),
  Evaluacion: '',
  observaciones: '',
  numOrden: '3',
  idTipoTrabajo: '2',
  cuilSupervisor: '400'
}
]

  /** Adds a new user to the database. */
Trabajo

  setTrabajos() {
    let copiedData = this.trabajos;
    for (let i = 0; i < copiedData.length; i++) {
          this.dataChange.next(<Trabajo[]>this.trabajos);
    }
  }


}

/**
* Data source to provide what data should be rendered in the table. Note that the data source
* can retrieve its data in any way. In this case, the data source is provided a reference
* to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
* the underlying data. Instead, it only needs to take the data and send the table exactly what
* should be rendered.
*/
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase,  private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Trabajo[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
      this._sort.mdSortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      console.log(displayDataChanges);
      // return this.getSortedData();
      return this._exampleDatabase.data.slice().filter((item: Trabajo) => {
        let searchStr = (item.numTrabajo + item.fechaRealizacion).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Trabajo[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'numTrabajo': [propertyA, propertyB] = [a.numTrabajo, b.numTrabajo]; break;
        case 'fechaRealizacion': [propertyA, propertyB] = [a.fechaRealizacion.toString(), b.fechaRealizacion.toString()]; break;
        case 'cuilSupervisor': [propertyA, propertyB] = [a.cuilSupervisor, b.cuilSupervisor]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

}
