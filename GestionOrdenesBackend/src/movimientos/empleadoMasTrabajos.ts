import * as express from 'express';
import { RUTAS } from '../config/rutas.config';
import { SERVIDOR } from '../config/servidor.config';

var http = require("http");


var Documento = require('../models/documento.model');
var Trabajo = require('../models/trabajo.model');
var Orden = require('../models/orden.model');
var Resultado = require('../models/resultado.model');

class EmpleadoMasTrabajos {
  public express;
  public router;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    // Cargamos los pasos del movimiento
    this.obtenerEmpleadoMasTrabajos();
  }

  // -------------------- Pasos --------------------------------------

  private obtenerEmpleadoMasTrabajos(){
    this.router.get('/empleado', (req,res) => {

      let fechaInicio = req.query.fechaInicio;
      let fechaFin = req.query.fechaFin;

      this.obtenerAsignaciones(fechaInicio, fechaFin).then(resultado => {
        resultado = JSON.parse(<any>resultado);
        console.log('######## Obtuve las asignaciones');
        console.log(resultado);

        let asignaciones= (<any>resultado).obj;
        asignaciones.forEach(function(asignacion, indexAsignacion){
          console.log('Asignacion:');
          console.log(asignacion);
        });

      }).catch(err => console.log('ERROR', err));


      return res.status(200);
    });
  }


  // -------------------- Metodos privados--------------------------------------

  private obtenerAsignaciones(fechaInicio, fechaFin){
    return new Promise((resolve, reject) => {

      let getAsignaciones = this.getOption(RUTAS.ASIGNACIONES_URL+'?expandirTrabajos=true&&expandirPersonal=true&&fechaInicio='+fechaInicio+'&&fechaFin='+fechaFin);

      this.getRaw(getAsignaciones)
      .then(asignaciones => {
        resolve(asignaciones);
      }).catch(err => {
        console.log('Error al buscar las asignaciones');
        console.error(err);
        reject(err)
      })
    });


  }

  private contarTrabajosFinalizados(){

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
      hostname: SERVIDOR.HOSTNAME,
      port: SERVIDOR.PUERTO,
      path: url,
      agent: false  // create a new agent just for this one request
    }
  }

  private getRaw(url) {

    return new Promise((resolve, reject) => {
      http.get(url, (response) => {

        const error = this.checkErrors(response);
        if (error) {
          reject(error);
        }else{
          let rawData = '';
          response.setEncoding('utf8');
          response.on('data',  (chunk) => { rawData += chunk; });
          response.on('end', () => {
            resolve((rawData))
          });
        }

      }).on('error', (err) => reject(err))
    })
  };


}


export default new EmpleadoMasTrabajos().router;
