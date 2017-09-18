import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';



import { OrdenServicio } from '../modelos/orden';
import { VariablesGlobales } from '../utiles/variablesGlobales';

@Injectable()
export class OrdenesService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private ordenesURL = VariablesGlobales.BASE_API_URL+'/ordenes';  // URL to web api

	constructor(private http: Http) {

	}

	getOrdenes(): Promise<OrdenServicio[]>{
		return this.http.get(this.ordenesURL)
		.toPromise()
		.then(response => {
			// console.log("Lo que devolvio el getOrdenes es...");
			// console.log(response.json());
			return response.json().obj as OrdenServicio[];
		})
		.catch(this.handleError);
	}

  getOrdenesStub():  Promise<OrdenServicio[]>{
    return new Promise( (resolve,reject) => resolve([
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
    ]));
  }

	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de Ordenes: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
