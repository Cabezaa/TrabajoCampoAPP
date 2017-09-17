import * as express from 'express';

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

        let nuevoResultado = {
          valor: req.body.valor
        }

        this.resultadosStub.push(nuevoResultado);

        res.status(200).json({
          message: 'Este es el nuevo resultado!',
          obj: this.resultadosStub[this.resultadosStub.length -1]
        })

      }

      res.status(200).json({
        message: 'Estas son los resultados!',
        obj: this.resultadosStub
      })
    });

  }
}


export default new ResultadosRoute().router;
