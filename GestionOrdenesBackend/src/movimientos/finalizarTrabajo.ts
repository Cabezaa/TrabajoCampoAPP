import * as express from 'express';
import { RUTAS } from '../config/rutas.config';

var http = require("http");
var ObjectId = require('mongoose').Types.ObjectId;

var Documento = require('../models/documento.model');
var Trabajo = require('../models/trabajo.model');
var Orden = require('../models/orden.model');
var Resultado = require('../models/resultado.model');

const checkObjectId = function(id) {

    if (ObjectId.isValid(id)) {

      var prueba = new ObjectId(id);

      if (prueba == id) {
        return true

      } else {
        return false
      }

    } else {
      return false
    }

};

class FinalizarTrabajo {
  public express;
  public router;

  private dominio = "localhost";
  private url_ordenes = RUTAS.ORDENES_URL;
  private url_trabajos = RUTAS.TRABAJOS_URL;
  private url_documentos = RUTAS.DOCUMENTOS_URL;
  private url_tiposParametros = RUTAS.TIPOS_PARAMETROS_URL;
  private url_resultados = RUTAS.RESULTADOS_URL;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    // Cargamos los pasos del movimiento
    this.getOrdenes(this.url_ordenes);
    this.getTrabajosOrden(this.url_trabajos);
    this.getTiposParametros(this.url_tiposParametros);
    this.finalizar(this.url_resultados, this.url_trabajos);

  }

  private getOrdenes(urlOrdenes){
    this.router.get('/ordenes', (req, res) => {

      let getOptions = this.getOption(this.url_ordenes);

      http.get(getOptions, (responseOrdenes) => {

        const error = this.checkErrors(responseOrdenes);
        if (error) {
          console.error(error.message);
          responseOrdenes.resume();
          return;
        }else{
          let rawOrdenes = '';
          responseOrdenes.setEncoding('utf8');
          responseOrdenes.on('data', (chunk) => { rawOrdenes += chunk; });
          responseOrdenes.on('end', () => {
            try {
              const parsedOrdenes = JSON.parse(rawOrdenes);
              // console.log(parsedOrdenes);

              return res.status(200).json(parsedOrdenes);

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

  private getTrabajosOrden(url_trabajos){
    this.router.get('/trabajos/:numOrden',(req,res)=>{

        let id_orden = req.params.numOrden;

        if(id_orden){
          let getOptions = this.getOption(this.url_trabajos + '/' + id_orden);

          http.get(getOptions, (responseTrabajos) => {

            const error = this.checkErrors(responseTrabajos);
            if (error) {
              // console.error(error.message);
              responseTrabajos.resume();
              return res.status(404).json({
                  title: 'Error al buscar trabajos!',
                  error: error
              });
            }else{
              let rawTrabajos = '';
              responseTrabajos.setEncoding('utf8');
              responseTrabajos.on('data', (chunk) => { rawTrabajos += chunk; });
              responseTrabajos.on('end', () => {
                try {
                  const parsedTrabajos = JSON.parse(rawTrabajos);
                  // console.log(parsedTrabajos);

                  return res.status(200).json(parsedTrabajos);

                } catch (e) {
                  // console.error(e.message);
                  return res.status(404).json({
                      title: 'Error al buscar trabajos!',
                      error: e
                  });
                }
              });
            }
          }).on('error', (e) => {
            // console.error(`Got error: ${e.message}`);
            return res.status(404).json({
                title: 'Error al buscar trabajos!',
                error: e
            });
          });;
        }


    });
  }

  private getTiposParametros(url_tiposParametros){
    this.router.get('/tiposParametro/tiposTrabajo/:idTipoTrabajo/tiposPieza/:codigoTipoPieza',(req,res)=>{

      let id_tipoTrabajo = req.params.idTipoTrabajo;
      let id_tipoPieza = req.params.codigoTipoPieza;


      if (!checkObjectId(id_tipoTrabajo) || !checkObjectId(id_tipoPieza)) {
        let respuesta = {
          title: 'Error: Uno de los parametros ingresados no corresponden con un id valido ',
          error: {}
        };

        return res.status(400).json(respuesta);
      }

      let getOptions = this.getOption( url_tiposParametros + '/' + id_tipoTrabajo + '/' + id_tipoPieza);

      http.get(getOptions, (responseTiposParametros) => {
        const error = this.checkErrors(responseTiposParametros);
        if (error) {
          // console.error(error.message);
          responseTiposParametros.resume();

          return res.send(error);
        }else{
          let rawTiposParametros = '';
          responseTiposParametros.setEncoding('utf8');
          responseTiposParametros.on('data', (chunk) => { rawTiposParametros += chunk; });
          responseTiposParametros.on('end', () => {
            try {
              const parsedTiposParametros = JSON.parse(rawTiposParametros);
              return res.status(200).json(parsedTiposParametros);

            } catch (e) {
              console.error(e.message);
            }
          });
        }
      }).on('error', (e) => {
        // console.error(`Got error: ${e.message}`);
        return res.send(e);
      });;

    });
  }

  private finalizar(url_resultados, url_trabajos){
    this.router.post('/resultados', (req, res) => {

      // console.log('ESTE ES EL POST De resultados');
      // console.log(req.body);


      let resultados = req.body.resultados;
      let trabajo = req.body.trabajo;

      if(!resultados || !trabajo ){
        let respuesta = {
          title: 'Error: Falta alguno de los dos parametros ingresados, o ambos. ',
          error: {}
        };

        return res.status(400).json(respuesta);
      }

      if(!checkObjectId(trabajo)){
        let respuesta = {
          title: 'Error: El id del trabajo ingresado no es valido',
          error: {}
        };

        return res.status(400).json(respuesta);
      }


      if(!Array.isArray(resultados)){
        let respuesta = {
          title: 'Error: Los resultados ingresados no respetan el formato de lista de resultados.',
          error: {}
        };

        return res.status(400).json(respuesta);
      }

      let aprobado = true;

      if(resultados){
        let resultadosAux = [];
        resultados.forEach(function(resultado, indexResultado){

          let parametroAux = resultado.tipoParametro;

          // Verificamos si estamos aprobados o no
          if(resultado.valor < parametroAux.valorMinimo || resultado.valor > parametroAux.valorMaximo){
            aprobado = false;
          }

          // Creamos el resultado
          let nuevoResultado = new Resultado({
            valor: resultado.valor,
            trabajo: trabajo,
            tipoParametro: parametroAux._id
          });

          resultadosAux.push(nuevoResultado);
        });


        /*
        Esta funcion asincronica, recibe cada medico y le busca
        su usuario correspondiente, y concatena los atributos de ambos
        */
        var resultAsync = function postResultAsync(resNuevo){
          return new Promise(resolve => {

            let r = new Resultado({
              valor: resNuevo.valor,
              trabajo: resNuevo.trabajo,
              tipoParametro: resNuevo.tipoParametro
            });

            r.save().then(resultadoNuevo =>{
              // console.log('Resultado guardado con exito!!');
              // console.log(resultadoNuevo);
              // res.status(200).json({
              //   message: 'Se ha guardado un resultado en la base de datos!',
              //   obj: resultadoNuevo
              // });

              resolve(resultadoNuevo)
            }, err =>{
              console.log('Error al guardar el resultado!!');
              // console.log(err);
            })
          })
        };


        // Mapeamos la funcion a cada Resultado perteneciente en resultadosAux
        var promesas = resultadosAux.map(resultAsync);

        var ejecutarPromesas = Promise.all(promesas);

        var ejecutarPromesas = Promise.all(promesas);

        // Registramos todos los resultados y luego el trabajo
        return ejecutarPromesas.then(resultadoPromesas =>
          {
            let evaluacion = 'desaprobado';

            // Registramos la evaluacion del trabajo
            if(aprobado){
              evaluacion = 'aprobado';
            }

            var query = Trabajo.findOne({'_id': trabajo});

            query.exec(function(err,trabajoBuscado){
              if (err) {
                return res.status(400).json({
                  title: 'An error occurred',
                  error: err
                });
              }

              // Actualizacion de evaluacion y fechaRealizacion
              trabajoBuscado.evaluacion = evaluacion;
              trabajoBuscado.fechaRealizacion = req.body.fechaRealizacion;

              trabajoBuscado.save().then(function(t){


                if(t.evaluacion == 'aprobado'){
                  let progreso = 100;

                  let query2 = Asignacion.find({'trabajo':t._id});

                  query2.exec(function(err,asignacion){
                    if (err) {
                      return res.status(400).json({
                        title: 'An error occurred',
                        error: err
                      });
                    }

                    if(!asignacion){
                      return res.status(400).json({
                        title: 'Error',
                        error: 'Asignacion no encontrado'
                      });
                    }

                    if(asignacion[0]){
                      asignacion[0].progreso = progreso;

                      asignacion[0].save().then(function(a){

                      }).catch(err => {console.log(err)});
                    }
                  });
                }
                else{

                }

                return res.status(200).json({
                  message: 'Success',
                  obj: trabajoBuscado
                });

              });
            }
          ).catch(err => {
            console.log(err);
          });

        });

      }
    })
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


export default new FinalizarTrabajo().router;
