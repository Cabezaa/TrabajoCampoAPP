import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

import { OrdenesService } from '../../servicios/ordenes.service';
import { OrdenServicio } from '../../modelos/orden';

@Component({
  selector: 'app-tabla-ordenes',
  templateUrl: './tablaOrdenes.component.html',
  styleUrls: ['./tablaOrdenes.component.css']
})
export class TablaOrdenesComponent implements OnInit {

  @Output() ordenSeleccionada = new EventEmitter();

  displayedColumns = ['numOrden', 'fechaIngreso', 'progresoTrabajo'];
  exampleDatabase : ExampleDatabase;
  dataSource: ExampleDataSource | null;

  seleccionado = {
    'id' : ''
  };

  @ViewChild('filter') filter: ElementRef;

  constructor(private ordenesService: OrdenesService){
      this.exampleDatabase = new ExampleDatabase(ordenesService);
  }

  rowClick(row){
    // console.log('Tocaron!!!');
    // console.log(row);
    row.seleccionada = !row.seleccionada;

    this.seleccionado = row;
  }

  siguiente(){
    console.log(this.seleccionado);
    this.ordenSeleccionada.next(this.seleccionado);
  }

  ngOnInit() {
    this.seleccionado = {
      'id' : ''
    };
    console.log(this.seleccionado);
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<OrdenServicio[]> = new BehaviorSubject<OrdenServicio[]>([]);
  get data(): OrdenServicio[] { return this.dataChange.value; }

  constructor(private ordenesService: OrdenesService) {

    this.ordenesService.getOrdenes().then(ordenesStub =>{
      this.setOrdenes(ordenesStub);
    }).catch(err => console.log(err));
  }

  setOrdenes(ordenes) {
    let copiedData = ordenes;
    this.dataChange.next(copiedData);

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

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<OrdenServicio[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: OrdenServicio) => {
        let searchStr = (item.numOrden + item.fechaIngreso).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}

}
