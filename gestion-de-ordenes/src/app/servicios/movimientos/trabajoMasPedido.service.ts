import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { VariablesGlobales } from '../../utiles/variablesGlobales';

@Injectable()
export class TrabajoMasPedidoService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private trabajoMasPedidoURL = VariablesGlobales.BASE_API_URL+'/movimientos/TrabajoMasPedido';  // URL to web api

	constructor(private http: Http) {

	}

  public consultarEmpresas(){
    return this.http.get(this.trabajoMasPedidoURL + '/empresas', {headers: this.headers}).toPromise()
    .then(res => {
      return res.json() as any;
    })
	}
	
	public obtenerTrabajoMasPedido(idEmpresa){
		return this.http.get(this.trabajoMasPedidoURL + '/calcular/'+idEmpresa, {headers: this.headers}).toPromise()
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
