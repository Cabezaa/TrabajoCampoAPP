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

@Component({
  selector: 'app-tabla-ordenes',
  templateUrl: './tablaOrdenes.component.html',
  styleUrls: ['./tablaOrdenes.component.css']
})
export class TablaOrdenesComponent implements OnInit {

  @Output() ordenSeleccionada = new EventEmitter();

  displayedColumns = ['numOrden', 'fechaIngreso', 'progresoTrabajo'];

  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  seleccionado = {
    'id' : ''
  };

  @ViewChild('filter') filter: ElementRef;

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
/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  seleccionada: boolean;
}

export interface OrdenServicio {
 numOrden: string;
 fechaIngreso: Date;
 progresoTrabajo: string;
 observaciones: string;
}



/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<OrdenServicio[]> = new BehaviorSubject<OrdenServicio[]>([]);
  get data(): OrdenServicio[] { return this.dataChange.value; }

  public ordenesDefault = [
  {
    numOrden: '1',
    fechaIngreso: (new Date()),
    progresoTrabajo: '50',
    observaciones: ''
  },
  {
    numOrden: '2',
    fechaIngreso: (new Date(2017,7,8)),
    progresoTrabajo: '20',
    observaciones: ''
  },
  {
    numOrden: '3',
    fechaIngreso: (new Date(2017,5,5)),
    progresoTrabajo: '0',
    observaciones: ''
  }
  ]

  getOrdenes(){
    return this.ordenesDefault;
  }

  constructor() {
    // Fill up the database with 100 users.
    // for (let i = 0; i < 5; i++) { this.addUser(); }
    // this.data = this.getOrdenes();
    this.setOrdenes();
  }

  /** Adds a new user to the database. */
  // addUser() {
  //   const copiedData = this.data.slice();
  //   copiedData.push(this.createNewUser());
  //   this.dataChange.next(copiedData);
  // }
  setOrdenes() {
    let copiedData = this.ordenesDefault;
    for (let i = 0; i < copiedData.length; i++) {
          this.dataChange.next(<OrdenServicio[]>this.ordenesDefault);
    }
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
      seleccionada:false
    };
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
