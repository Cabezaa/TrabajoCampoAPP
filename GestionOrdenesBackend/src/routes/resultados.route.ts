import * as express from 'express';

var Resultado = require('../models/resultado.model');

class ResultadosRoute {
  public express;
  public router;

  private resultadosStub = [];

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      res.status(200).json({
        message: 'Estas son los resultados!',
        obj: this.resultadosStub
      })
    });

    this.router.post('/', (req, res) => {

      console.log('ESTE ES EL POST De resultados');
      console.log(req.body);
      // console.log(req);
      /*
      Controlamos los casos de error
      */
      if(!req.body.valor){


        console.log('No vino el valor del resultado!!!');
        return res.status(400).json({
          title: 'Error',
          error: 'No ha enviado el valor del resultado!'
        });
      }
      else{
        if(isNaN(req.body.valor)){
          return res.status(400).json({
            title: 'Error',
            error: 'El resultado debe ser un valor numerico!'
          });
        }


        // Guardamos el nuevo resultado

        let nuevoResultado = new Resultado({
          valor: req.body.valor,
          trabajo: req.body.trabajo,
          tipoParametro: req.body.tipoParametro
        });

        nuevoResultado.save().then(resultadoNuevo =>{
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
        // this.resultadosStub.push(nuevoResultado);
      }
    });

  }
}


export default new ResultadosRoute().router;
