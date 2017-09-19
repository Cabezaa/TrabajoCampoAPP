import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Resultado } from '../modelos/resultado';
import { VariablesGlobales } from '../utiles/variablesGlobales';

@Injectable()
export class ResultadosService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private resultadosURL = VariablesGlobales.BASE_API_URL+'/resultados';  // URL to web api

	constructor(private http: Http) {

	}

	getResultados(): Promise<Resultado[]>{
		return this.http.get(this.resultadosURL)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json() as Resultado[];
		})
		.catch(this.handleError);
	}

  createResultado(valor, trabajo, tipoParametro):Promise<Resultado>{

		console.log(valor);
		console.log(trabajo);
		console.log(tipoParametro);

		let nuevoResultado = {
			valor: valor,
			trabajo: trabajo,
			tipoParametro: tipoParametro
		};

		return this.http
		.post(this.resultadosURL, JSON.stringify(nuevoResultado), {headers: this.headers})
		 .toPromise()
		.then(res => {
			return res.json() as Resultado;
		})
	}


	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de Trabajos: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
