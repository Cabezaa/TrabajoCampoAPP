import * as express from 'express';
import { RUTAS } from '../config/rutas.config';

import series from 'async/series';

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

  constructor() {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    this.router = express.Router();

    // Cargamos los pasos del movimiento
    this.getEmpresas(this.url_empresas);
    this.obtenerCantidadTrabajos();
  }

  private getEmpresas(urlEmpresas) {
    this.router.get('/empresas', (req, res) => {
      let getOptions = this.getOption(this.url_empresas);

      http.get(getOptions, (responseEmpresas) => {

        const error = this.checkErrors(responseEmpresas);
        if (error) {
          console.error(error.message);
          responseEmpresas.resume();
          return;
        } else {
          let rawEmpresas = '';
          responseEmpresas.setEncoding('utf8');
          responseEmpresas.on('data', (chunk) => { rawEmpresas += chunk; });
          responseEmpresas.on('end', () => {
            try {
              const parsedEmpresas = JSON.parse(rawEmpresas);
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

  private obtenerCantidadTrabajos() {

    let trabajosArray = [];
    this.router.get('/calcular/:idEmpresa', (req, res) => {

      let id_empresa = req.params.idEmpresa;

      this.consultaCompleja(id_empresa).then((respuestaFinalTrabajos) => {
        let arregloTemp: [any] = <[any]>respuestaFinalTrabajos;
        let diccionario = {};

        for (var index = 0; index < arregloTemp.length; index++) {
          if(arregloTemp[index] != null ){
            this.sumarTipoTrabajo(arregloTemp[index].tipoTrabajo.nombre, diccionario);
          }
        }

        let resultadoMayor = this.obtenerMayor(diccionario);

        let respuesta = {
          msg: "El trabajo mas pedido de la empresa es: ",
          obj: { nombre: resultadoMayor,
                 cantidad : diccionario[resultadoMayor]
          }
        };

        return res.status(200).json(respuesta);

      }).catch(err => {
        console.error(err);
      })
    }

    );
  }


  private consultaCompleja(idEmpresa) {
    // Funcion primera.
    return new Promise((resolve, reject) => {
      let trabajosArray = [];
      let getSectoresOptions = this.getOption(this.url_sectores + '/' + idEmpresa);

      this.getRaw(getSectoresOptions).then(sectoresDeEmpresaRaw => {
        let resultado = JSON.parse(<any>sectoresDeEmpresaRaw);

        let sectores = resultado.obj;

        var yo = this;
        var funcion1 = function funcion1Async(sector) {
          return new Promise(resolve => {

            let id_sector = sector._id;
            return yo.getTrabajosDeUnSector(id_sector).then(trabajosDeUnSector => { //TODO: quizas el retorno no es necesario.
              resolve(trabajosDeUnSector);
            });

          })
        }
        let promesasSector = sectores.map(funcion1);
        let ejecutarSectores = Promise.all(promesasSector);
        return ejecutarSectores.then(listaFinalTrabajos => { //TODO: quizas el retorno no es necesario.
          //Aca entra el resultado final

          let listaAux1 = [];
          for (var index = 0; index < listaFinalTrabajos.length; index++) {
            var element = listaFinalTrabajos[index];
            listaAux1 = listaAux1.concat(element);
          }

          resolve(listaAux1);
        }).catch(err=>{
          console.log("Error en consulta compleja!");
          console.log(err);
        })
      });
    });

  }

  private getTrabajosDeUnSector(idSector) {
    return new Promise((resolve, reject) => {

      let getOrdenesOptions = this.getOption(this.url_ordenes + '/' + idSector);
      let listaTrabajosCompartida = [];

      this.getRaw(getOrdenesOptions).then(ordenesDeSectorRaw => {

        let resultadoOrdenes = JSON.parse(<any>ordenesDeSectorRaw);

        let ordenes = resultadoOrdenes.obj;

        var yo = this;
        var funcion2 = function funcion2Async(orden) {
          return new Promise(resolve => {
            let id_orden = orden._id;
            return yo.getTrabajosDeOrden(id_orden).then(trabajos => { //TODO: quizas el retorno no es necesario.
              resolve(trabajos);
            })
          })
        }

        if (ordenes.length > 0) {
          let promesasOrdenes = ordenes.map(funcion2);
          let ejecutarOrdenes = Promise.all(promesasOrdenes);
          return ejecutarOrdenes.then(listaFinal => { //TODO: quizas el retorno no es necesario
            let listaAux = [];
            for (var index = 0; index < listaFinal.length; index++) {
              var element = listaFinal[index];
              listaAux = listaAux.concat(element);

            }
            resolve(listaAux);
          })
        }
        else{
          resolve(null);
        }
      });
    });

  }

  private getTrabajosDeOrden(idOrden) {

    return new Promise((resolve, reject) => {
      let getTrabajosOption = this.getOption(this.url_trabajos + '/' + idOrden);

      this.getRaw(getTrabajosOption).then(trabajosDeOrdenRaw => {
        let resultadoTrabajos = JSON.parse(<any>trabajosDeOrdenRaw);

        let trabajos = resultadoTrabajos.obj;
        resolve(trabajos);
      });
    })

  }

  private sumarTipoTrabajo(tipoTrabajo, diccionario) {

    if (diccionario.hasOwnProperty(tipoTrabajo)) {
      diccionario[tipoTrabajo] += 1;
    }
    else {
      diccionario[tipoTrabajo] = 1;
    }

  }

  private obtenerMayor(diccionario) {

    let keyMayor;
    let valueMayor = -1;
    for (var propiedad in diccionario) {
      if (diccionario.hasOwnProperty(propiedad)) {
        if (diccionario[propiedad] >= valueMayor) {
          keyMayor = propiedad;
          valueMayor = diccionario[propiedad];
        }
      }

    }
    return keyMayor;
  }


  private getRaw(url) {

    return new Promise((resolve, reject) => {
      http.get(url, (response) => {

        const error = this.checkErrors(response);
        if (error) {
          reject(error);
        } else {
          let rawData = '';
          response.setEncoding('utf8');
          response.on('data', (chunk) => { rawData += chunk; });
          response.on('end', () => {
            resolve((rawData))
          });
        }

      }).on('error', (err) => reject(err))
    })
  }

  private checkErrors(response) {
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

  private getOption(url) {
    return {
      hostname: this.dominio,
      port: 3000,
      path: url,
      agent: false  // create a new agent just for this one request
    }

  }
}

export default new TrabajoMasPedido().router;
