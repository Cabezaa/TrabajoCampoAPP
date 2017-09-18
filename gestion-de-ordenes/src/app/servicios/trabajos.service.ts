import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Trabajo } from '../modelos/trabajo';
import { VariablesGlobales } from '../utiles/variablesGlobales';

@Injectable()
export class TrabajosService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private trabajosURL = VariablesGlobales.BASE_API_URL+'/trabajos';  // URL to web api

	constructor(private http: Http) {

	}

	getTrabajos(): Promise<Trabajo[]>{
		return this.http.get(this.trabajosURL)
		.toPromise()
		.then(response => {
			console.log("Trabajos recibidos");
			console.log(response.json());
			return response.json().obj as Trabajo[];
		})
		.catch(this.handleError);
	}

	getTrabajosDeOrden(idOrden):Promise<Trabajo[]>{
		return this.http.get(this.trabajosURL+'/'+idOrden)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json().obj as Trabajo[];
		})
		.catch(this.handleError);
	}

  getTrabajosExample():  Promise<Trabajo[]>{
    return new Promise( (resolve,reject) => resolve([
      {
        numTrabajo: '1',
        fechaRealizacion:(new Date(2017,8,1)),
        Evaluacion: '',
        observaciones: '',
        numOrden: '1',
        idTipoTrabajo: '1',
        cuilSupervisor: '400'
      },
      {
        numTrabajo: '2',
        fechaRealizacion: (new Date(2017,6,15)),
        Evaluacion: '',
        observaciones: '',
        numOrden: '1',
        idTipoTrabajo: '2',
        cuilSupervisor: '400'
      },
      {
        numTrabajo: '3',
        fechaRealizacion: (new Date(2017,8,8)),
        Evaluacion: '',
        observaciones: '',
        numOrden: '2',
        idTipoTrabajo: '1',
        cuilSupervisor: '500'
      },
      {
        numTrabajo: '4',
        fechaRealizacion: (new Date(2017,5,4)),
        Evaluacion: '',
        observaciones: '',
        numOrden: '3',
        idTipoTrabajo: '2',
        cuilSupervisor: '400'
      }
    ]));
  }

  createTrabajo():Promise<Trabajo>{

		return this.http
		.post(this.trabajosURL, JSON.stringify(
      {
        //Datos del nuevo trabajo
		 }))
		 .toPromise()
		.then(res => {
			return res.json() as Trabajo;
		})
	}


	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de Trabajos: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
