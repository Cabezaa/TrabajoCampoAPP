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

      if(!fechaInicio || !fechaFin){
        let err = new Error('Error en una de las dos fechas ingresadas.');
        console.error(err);
        return res.status(400).json({
          title: 'Error en empleado con mas trabajos en un periodo!',
          error: err.message
        });
      }

      if(fechaFin >= fechaInicio){
        this.obtenerAsignaciones(fechaInicio, fechaFin).then(resultado => {
          resultado = JSON.parse(<any>resultado);
          console.log('######## Obtuve las asignaciones');
          console.log(resultado);
          let asignaciones= (<any>resultado).obj;
          if(asignaciones && asignaciones.length > 0){
            this.obtenerMaxEmpleado(asignaciones)
            .then(empleadoMax =>{
              return res.status(200).json({
                message: 'Este es el emplado con mas asginaciones en el periodo!',
                obj: empleadoMax
              });
            })
            .catch(err => {
              console.log('### Error');
              return res.status(400).json({
                title: 'Error en empleado con mas trabajos en un periodo!',
                error: err
              });
            })
          }
          else{
            let err = new Error('No existen asignaciones en ese periodo');
            console.error(err);
            return res.status(400).json({
              title: 'Error en empleado con mas trabajos en un periodo!',
              error: err.message
            });
          }
  
        }).catch(err => {
          console.log('ERROR', err);
          return res.status(400).json({
            title: 'Error en empleado con mas trabajos en un periodo!',
            error: err
          });
        });
      }
      else{
        let err = new Error('La fecha fin no puede ser menor a la de inicio');
        console.error(err);
        return res.status(400).json({
          title: 'Error en empleado con mas trabajos en un periodo!',
          error: err.message
        });
      }
      



    });
  }


  // -------------------- Metodos privados--------------------------------------


  /*
  Retorna las asignaciones de un periodo
  */
  private obtenerAsignaciones(fechaInicio, fechaFin){
    return new Promise((resolve, reject) => {
      console.log('----------------------------------------- obtenerAsignaciones');
      console.log(fechaInicio);
      console.log(fechaFin);


      let getAsignaciones = this.getOption(RUTAS.ASIGNACIONES_URL+'?expandirTrabajos=true&&expandirPersonal=true&&fechaInicio='+fechaInicio+'&&fechaFin='+fechaFin);
      console.log('###### Aca 1');
      this.getRaw(getAsignaciones)
      .then(asignaciones => {
        console.log('###### Aca 2');
        resolve(asignaciones);
      }).catch(err => {
        console.log('###### Aca 3');
        console.log('Error al buscar las asignaciones');
        console.error(err);
        reject(err)
      })
    });


  }

  /*
  Devuelve el emplado con mas asignaciones
  */
  private obtenerMaxEmpleado(asignaciones){

    console.log('----------------------------------- obtenerMaxEmpleado');
    console.log(asignaciones);

    return new Promise((resolve, reject) => {
      let empleadoMax = {
        count: -99
      };
      asignaciones.forEach(function(asignacion, indexAsignacion){
        console.log('Asignacion:');
        console.log(asignacion);

        if(asignacion._id.progreso == 'finalizado'){
          if(asignacion.count > empleadoMax.count){
            empleadoMax = asignacion;
          }
        }
      });

      if(empleadoMax.count > -1){
        resolve(empleadoMax);
      }else{
        reject(new Error('Error al buscar el empleado con mas asignaciones en el periodo!'))
      }

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
