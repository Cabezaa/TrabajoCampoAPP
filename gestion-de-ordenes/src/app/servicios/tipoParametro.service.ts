import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { Documento } from '../modelos/documento';
import { VariablesGlobales } from '../utiles/variablesGlobales';

@Injectable()
export class TipoParametroService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private tipoParametroURL = VariablesGlobales.BASE_API_URL+'/tipoparametro';  // URL to web api

	constructor(private http: Http) {

	}


  getTipoParametro(): Promise<any[]>{
    return this.http.get(this.tipoParametroURL)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json().obj as any[];
		})
		.catch(this.handleError);
  }

  getTipoParametroFiltrado(idTipoTrabajo,codigoTipoPieza): Promise<any[]>{
    return this.http.get(this.tipoParametroURL+'/'+idTipoTrabajo+'/'+codigoTipoPieza)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json().obj as any[];
		})
		.catch(this.handleError);
  }

  getTipoParametroDocumento(idDocumento):Promise <any[]>{
    return this.http.get(this.tipoParametroURL+'/'+idDocumento)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json().obj as any[];
		})
		.catch(this.handleError);
  }


	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de Documentos: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
