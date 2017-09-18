import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Documento } from '../modelos/documento';
import { VariablesGlobales } from '../utiles/variablesGlobales';

@Injectable()
export class DocumentosService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private documentosURL = VariablesGlobales.BASE_API_URL+'/documentos';  // URL to web api

	constructor(private http: Http) {

	}

	getDocumentos(): Promise<Documento[]>{
		return this.http.get(this.documentosURL)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json().obj as Documento[];
		})
		.catch(this.handleError);
	}

	getDocumentosFiltro(idDocumento): Promise<Documento[]>{
		return this.http.get(this.documentosURL+'/'+idDocumento)
		.toPromise()
		.then(response => {
			////console.log(response.json());
			return response.json().obj as Documento[];
		})
		.catch(this.handleError);
	}

  getDocumentosStub():  Promise<Documento[]>{
    return new Promise( (resolve,reject) => resolve([
			{
		    idDocumento: '1',
		    descripcion: 'documento numero 1',
		    linkArchivo: '/carpeta',
		    nombreArchivo: 'iso1903'
		  },
		  {
		    idDocumento: '2',
		    descripcion: 'documento numero 2',
		    linkArchivo: '/carpeta',
		    nombreArchivo: 'iso1904'
		  }
    ]));
  }


	private handleError(error: any): Promise<any> {
		console.error('Ocurrio un error en servicio de Documentos: ', error);
		alert(error.json().error);
		return Promise.reject(error.message || error);
	}

}
