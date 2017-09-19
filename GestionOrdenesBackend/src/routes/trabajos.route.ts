import * as express from 'express';

var Trabajo = require('../models/trabajo.model');
var TipoTrabajo = require('../models/tipoTrabajo.model');
var TipoPieza = require('../models/tipoPieza.model');
var Pieza = require('../models/pieza.model');

class TrabajosRoute {
  public express;
  public router;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/seedTipoTrabajo', (req, res) => {
      let tipoTrabajoAux = new TipoTrabajo({
        idTipoTrabajo: '1',
        nombre: 'Inspeccion particulas magnetizables',
        descripcion: 'Inspeccion por magnetizacion de particulas de las piezas.'
      });

      tipoTrabajoAux.save().then(documentoNuevo => {
        console.log('Documento guardado con exito!!');
        console.log(documentoNuevo);
      }, err => {
        console.log('Error al guardar el documento!!');
        console.log(err);
      });

      let tipoTrabajoAux2 = new TipoTrabajo({
        idTipoTrabajo: '2',
        nombre: 'Inspeccion por ultrasonido',
        descripcion: 'Inspeccion por ultrasonido de piezas.'
      });

      tipoTrabajoAux2.save().then(documentoNuevo => {
        console.log('Documento guardado con exito!!');
        console.log(documentoNuevo);
      }, err => {
        console.log('Error al guardar el documento!!');
        console.log(err);
      });

      res.status(200).json({
        message: 'Se han guardado documentos en la base de datos!'
      });
    });

    this.router.get('/seed', (req, res) => {
      let tipoTrabajoAux = new TipoTrabajo({
        idTipoTrabajo: '1',
        nombre: 'Inspeccion particulas magnetizables',
        descripcion: 'Inspeccion por magnetizacion de particulas de las piezas.'
      });

      tipoTrabajoAux.save().then(documentoNuevo => {
        console.log('Documento guardado con exito!!');
        console.log(documentoNuevo);
      }, err => {
        console.log('Error al guardar el documento!!');
        console.log(err);
      });

      let tipoTrabajoAux2 = new TipoTrabajo({
        idTipoTrabajo: '2',
        nombre: 'Inspeccion por ultrasonido',
        descripcion: 'Inspeccion por ultrasonido de piezas.'
      });

      tipoTrabajoAux2.save().then(documentoNuevo => {
        console.log('Documento guardado con exito!!');
        console.log(documentoNuevo);
      }, err => {
        console.log('Error al guardar el documento!!');
        console.log(err);
      });

      res.status(200).json({
        message: 'Se han guardado documentos en la base de datos!'
      });
    });

    this.router.get('/', (req, res) => {

      Trabajo.find()
      .populate('pieza tipoTrabajo ordenServicio')
      .exec( (err,trabajos) => {
        if(err){
          return res.status(404).json({
            title: 'Error al buscar trabajos!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son los trabajos!',
            obj: trabajos
          });
        }
      })
    });

    this.router.get('/:numOrden',(req,res)=>{
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

    this.router.put('/:idTrabajo', (req,res)=>{
      if(!req.body.evaluacion){
        return res.status(400).json({
          title: 'Error',
          error: 'Falta enviar la evaluacion.'
        });
      }

      var query = Trabajo.findOne({'_id':req.params.idTrabajo});

      query.exec(function(err,trabajo){
        if (err) {
          return res.status(400).json({
            title: 'An error occurred',
            error: err
          });
        }


        if(!trabajo){
          return res.status(400).json({
            title: 'Error',
            error: 'Trabajo no encontrado'
          });
        }

        trabajo.evaluacion = req.body.evaluacion;
        trabajo.fechaRealizacion = req.body.fechaRealizacion;

        trabajo.save().then(function(t){
          console.log('SE ACTUALIZO EL CHABON!!!!!!');
          console.log(t);
          res.status(200).json({
            message: 'Success',
            obj: trabajo
          });
        }, function(err){
          return res.status(400).json({
            title: 'Error',
            error: err
          });
        });

      });

    });


  }
}


export default new TrabajosRoute().router;
