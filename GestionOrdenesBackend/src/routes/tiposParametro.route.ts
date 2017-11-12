import * as express from 'express';

var TipoParametro = require('../models/tipoParametro.model');

class TipoParametroRoute {
  public express;
  public router;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      TipoParametro.find()
      .populate('tipoTrabajo tipoPieza documento')
      .exec( (err,tiposParametro) => {
        if(err){
          return res.status(404).json({
            title: 'Error al buscar tiposParametro!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son los tiposParametro!',
            obj: tiposParametro
          });
        }
      })
    });

    this.router.get('/:idTipoTrabajo/:codigoTipoPieza',(req,res)=>{

      let idTipoTrabajo = req.params.idTipoTrabajo;
      let codigoTipoPieza = req.params.codigoTipoPieza;
      let resultado = [];

      console.log("llegue a tipoParametro");
      console.log(idTipoTrabajo);
      console.log(codigoTipoPieza);
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

    this.router.get('/:idDocumento',(req,res)=>{
      //Obtenemos todos los tipos parametros para ese documento.
      let idDocumento = req.params.idDocumento;
      let resultado = [];


      if(idDocumento != null){
        TipoParametro.find({'documento': idDocumento})
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
        return res.status(400).json({
          title: 'Error',
          error: 'El valor de entrada de idDocumento no es correcto!'
        });
      }

    });

  }
}


export default new TipoParametroRoute().router;
