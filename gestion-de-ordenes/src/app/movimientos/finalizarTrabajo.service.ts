import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Documento } from '../modelos/documento';
import { VariablesGlobales } from '../utiles/variablesGlobales';

@Injectable()
export class FinalizarTrabajoService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private finalizarTrabajoURL = VariablesGlobales.BASE_API_URL+'/movimientos/finalizarTrabajo';  // URL to web api

	constructor(private http: Http) {

	}

	finalizar(trabajoId, fechaRealizacion, resultados){

    let trabajoFinalizar = {
      "trabajo": trabajoId,
      "fechaRealizacion": fechaRealizacion,
      "resultados": resultados
    };

    return this.http
    .post(this.finalizarTrabajoURL + '/resultados', JSON.stringify(trabajoFinalizar), {headers: this.headers})
     .toPromise()
    .then(res => {
      return res.json() as any;
    })
  }



	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de FinalizarTrabajo: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
