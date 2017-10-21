import * as express from 'express';
import { RUTAS } from '../config/rutas.config';

var http = require("http");


var Documento = require('../models/documento.model');
var Trabajo = require('../models/trabajo.model');
var Orden = require('../models/orden.model');
var Resultado = require('../models/resultado.model');


class TrabajoMasPedido {
  public express;
  public router;

  private dominio = "localhost";
  private url_ordenes = RUTAS.ORDENES_URL;
  private url_trabajos = RUTAS.TRABAJOS_URL;
  private url_empresas = RUTAS.EMPRESAS_URL;
  private url_sectores = RUTAS.SECTORES_URL;


  private url_tiposParametros = RUTAS.TIPOS_PARAMETROS_URL;
  private url_resultados = RUTAS.RESULTADOS_URL;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }
  private mountRoutes (): void {
    this.router = express.Router();

    // Cargamos los pasos del movimiento
    this.getEmpresas(this.url_empresas);
    // this.getTrabajosOrden(this.url_trabajos);
    // this.getTiposParametros(this.url_tiposParametros);
    // this.finalizar(this.url_resultados, this.url_trabajos);

  }

  private getEmpresas(urlEmpresas){
    this.router.get('/empresas', (req, res) => {
      console.log("Entre a empresas");
      let getOptions = this.getOption(this.url_empresas);

      http.get(getOptions, (responseEmpresas) => {

        const error = this.checkErrors(responseEmpresas);
        if (error) {
          console.error(error.message);
          responseEmpresas.resume();
          return;
        }else{
          let rawEmpresas = '';
          responseEmpresas.setEncoding('utf8');
          responseEmpresas.on('data', (chunk) => { rawEmpresas += chunk; });
          responseEmpresas.on('end', () => {
            try {
              const parsedEmpresas = JSON.parse(rawEmpresas);
              // console.log(parsedEmpresas);

              return res.status(200).json(parsedEmpresas);

            } catch (e) {
              console.error(e.message);
            }
          });
        }
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
      });;

    });
  }











  private checkErrors(response){
    const { statusCode } = response;
    const contentType = response.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
      `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
      `Expected application/json but received ${contentType}`);
    }
    return error;
  }

  private getOption(url){
    return {
      hostname: this.dominio,
      port: 3000,
      path: url,
      agent: false  // create a new agent just for this one request
    }

  }
}

export default new TrabajoMasPedido().router;
