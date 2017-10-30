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
    // this.getTrabajosOrden(this.url_trabajos);
    // this.getTiposParametros(this.url_tiposParametros);
    // this.finalizar(this.url_resultados, this.url_trabajos);

  }

  private getEmpresas(urlEmpresas) {
    this.router.get('/empresas', (req, res) => {
      console.log("Entre a empresas");
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

  private obtenerCantidadTrabajos() {

    let trabajosArray = [];
    this.router.get('/calcular/:idEmpresa', (req, res) => {
      console.log("Entre a calcular");

      let id_empresa = req.params.idEmpresa;


      this.consultaCompleja(id_empresa).then((respuestaFinalTrabajos) => {
        let arregloTemp:[any] = <[any]>respuestaFinalTrabajos;
        let diccionario = {};

        for (var index = 0; index < arregloTemp.length; index++) {
          this.sumarTipoTrabajo(arregloTemp[index].tipoTrabajo.nombre,diccionario);
        }


        let resultadoMayor = this.obtenerMayor(diccionario);

        // console.log("El resultado final es.... ",resultadoMayor)
        let respuesta = {
          msg : "El trabajo mas pedido de la empresa es: ",
          obj : {resultadoMayor : diccionario[resultadoMayor]}
        };


        return res.status(200).json(respuesta);

      }).catch(err => {
        console.log("Exploto el back end en la consulta compleja.")
        console.log(err);
      })


    }

    );
  }


  private consultaCompleja(idEmpresa) {
    //Funcion primera.
    return new Promise((resolve, reject) => {
      let trabajosArray = [];
      let getSectoresOptions = this.getOption(this.url_sectores + '/' + idEmpresa);

      this.getRaw(getSectoresOptions).then(sectoresDeEmpresaRaw => {
        let resultado = JSON.parse(<any>sectoresDeEmpresaRaw);
        // console.log("el resultadoSector es deee ####", resultado);

        let sectores = resultado.obj;

        //For Each de cada sector, le busco todas sus ordenes.
        /* for (let i = 0; i < sectores.length; i++) {
          let id_sector = sectores[i]._id;
          this.getOrdenesDeUnSector(id_sector);
        } */
        var yo = this;
        var funcion1 = function funcion1Async(sector) {
          return new Promise(resolve => {
            // console.log("Entre a la funcion 1 asdasdasdsadasda");
            let id_sector = sector._id;
            // console.log("----------D ",id_sector);
            return yo.getTrabajosDeUnSector(id_sector).then(trabajosDeUnSector => { //TODO: quizas el retorno no es necesario.
              // trabajosArray.push(trabajosDeUnSector);
              // resolve(trabajosArray);
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

        /* if (ordenes.length > 0) {
          //Si existen ordenes pedidas por ese sector de la empresa.
          for (let j = 0; j < ordenes.length; j++) {
            this.getTrabajosDeOrden(ordenes[j]._id);
          }
  
        } */
        var yo = this;
        var funcion2 = function funcion2Async(orden) {
          return new Promise(resolve => {
            let id_orden = orden._id;
            return yo.getTrabajosDeOrden(id_orden).then(trabajos => { //TODO: quizas el retorno no es necesario.
            
              // listaTrabajosCompartida.push(trabajos);
              // resolve(listaTrabajosCompartida);
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
        // trabajosArray.push(trabajos);

      });
    })

  }

private sumarTipoTrabajo(tipoTrabajo,diccionario){

  if(diccionario.hasOwnProperty(tipoTrabajo)){
    diccionario[tipoTrabajo] += 1;
  }
  else{
    diccionario[tipoTrabajo] = 1;
  }

}

private obtenerMayor(diccionario){

  let keyMayor;
  let valueMayor = -1;
  for (var propiedad in diccionario) {
    if(diccionario.hasOwnProperty(propiedad)){
      if(diccionario[propiedad]>= valueMayor){
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
