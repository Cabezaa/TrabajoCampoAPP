import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { VariablesGlobales } from '../../utiles/variablesGlobales';

@Injectable()
export class EmpleadoMasTrabajosService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private empleadoMasTrabajos = VariablesGlobales.BASE_API_URL+'/movimientos/empleadoMasTrabajos/';  // URL to web api

	constructor(private http: Http) {

	}

	obtenerEmpleadoMasTrabajos(fechaInicio, fechaFin){

		console.log('### obtenerEmpleadoMasTrabajos service');
		console.log('Fecha inicio: ',fechaInicio);
		console.log('Fecha fin: ',fechaFin);

		return this.http.get(this.empleadoMasTrabajos+'/empleado?fechaInicio=01-01-2005&&fechaFin=02-02-2005')
		.toPromise()
		.then(empleadoAsignaciones => {
			console.log('### Obtuve el empleado con mas trabajos en un periodo');
			console.log(empleadoAsignaciones.json().obj);

			return empleadoAsignaciones.json().obj
		})
		.catch(err => {
			console.log('Error en obtenerEmpleadoMasTrabajos');
			this.handleError(err);
		})

	}



	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de EmpleadoMasTrabajos: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
