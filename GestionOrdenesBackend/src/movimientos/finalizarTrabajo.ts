import * as express from 'express';

var Documento = require('../models/documento.model');
var Trabajo = require('../models/trabajo.model');
var Orden = require('../models/orden.model');
var Resultado = require('../models/resultado.model');

class FinalizarTrabajo {
  public express;
  public router;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    // Cargamos los pasos del movimiento
    this.getOrdenes();
    this.getTrabajosOrden();
    this.getTiposParametros();
    this.finalizar();

  }

  private getOrdenes(){
    this.router.get('/ordenes', (req, res) => {

      Orden.find()
      .exec( (err,ordenes) => {
        if(err){
          return res.status(404).json({
            title: 'Error al buscar ordenes!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son los ordenes!',
            obj: ordenes
          });
        }
      })
    });
  }

  private getTrabajosOrden(){
    this.router.get('/trabajos/:numOrden',(req,res)=>{
      let numOrden = req.params.numOrden;
      if(numOrden != null){
        Trabajo.find({'ordenServicio': numOrden})
        .populate('pieza tipoTrabajo ordenServicio')
        .exec( (err,trabajos) => {
          if(err){
            return res.status(404).json({
              title: 'Error al buscar trabajos!',
              error: err
            });
          }
          else{
            //Retornamos los trabajos filtrados como resultado de la consulta.
            res.status(200).json({
              message: 'Estas son los trabajos!',
              obj: trabajos
            });
          }
        })
      }
      else{
        //En caso de error en el valor de entrada, devolvemos un error.
        return res.status(400).json({
          title: 'Error',
          error: 'El valor de entrada de numOrden no es correcto!'
        });
      }
    });
  }

  private getTiposParametros(){
    this.router.get('/tiposParametro/tiposTrabajo/:idTipoTrabajo/tiposPieza/:codigoTipoPieza',(req,res)=>{

      let idTipoTrabajo = req.params.idTipoTrabajo;
      let codigoTipoPieza = req.params.codigoTipoPieza;
      let resultado = [];
      if(idTipoTrabajo != null && codigoTipoPieza != null){

        TipoParametro.find({'tipoTrabajo': idTipoTrabajo, 'tipoPieza': codigoTipoPieza })
        .populate('tipoTrabajo tipoPieza documento')
        .exec( (err,tiposParametro) => {
          if(err){
            return res.status(404).json({
              title: 'Error al buscar tiposParametro!',
              error: err
            });
          }
          else{
            //Retornamos los tipoParametro que cumplen con el idTipoTrabajo e idTipoPieza requerido.
            res.status(200).json({
              message: 'Estas son los tiposParametro filtrados con exito!',
              obj: tiposParametro
            });
          }
        })

      }
      else{
        //Buscamos los posibles casos de errores...
        if(idTipoTrabajo == null){
          return res.status(400).json({
            title: 'Error',
            error: 'El valor de entrada de idTipoTrabajo no es correcto!'
          });
        }
        if(codigoTipoPieza == null){
          return res.status(400).json({
            title: 'Error',
            error: 'El valor de entrada de idTipoPieza no es correcto!'
          });
        }
        if(idTipoTrabajo == null && codigoTipoPieza == null){
          return res.status(400).json({
            title: 'Error',
            error: 'Ninguno de los 2 valores de entradas son correctos!!'
          });
        }
      }

    });
  }

  private finalizar(){
    this.router.post('/resultados', (req, res) => {

      console.log('ESTE ES EL POST De resultados');
      console.log(req.body);


      let resultados = req.body.resultados;
      let trabajo = req.body.trabajo;

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
              console.log('Resultado guardado con exito!!');
              console.log(resultadoNuevo);
              res.status(200).json({
                message: 'Se ha guardado un resultado en la base de datos!',
                obj: resultadoNuevo
              });
            }, err =>{
              console.log('Error al guardar el resultado!!');
              console.log(err);
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
                console.log('SE ACTUALIZO EL CHABON!!!!!!');
                console.log(t);


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

}


export default new FinalizarTrabajo().router;
