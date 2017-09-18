import * as express from 'express';

class TipoParametroRoute {
  public express;
  public router;

  private tipoParametroStub = [
    {
      idTipoParametro: '1',
      valorMinimo: 2,
      valorMaximo: 10,
      nombreAtributo: 'x',
      idTipoTrabajo: '1',
      codigoTipoPieza: 'tp1',
      idDocumento: '1'
    },
    {
      idTipoParametro: '2',
      valorMinimo: 3,
      valorMaximo: 7,
      nombreAtributo: 'y',
      idTipoTrabajo: '1',
      codigoTipoPieza: 'tp1',
      idDocumento: '1'
    },
    {
      idTipoParametro: '3',
      valorMinimo: 0,
      valorMaximo: 2,
      nombreAtributo: 'z',
      idTipoTrabajo: '1',
      codigoTipoPieza: 'tp1',
      idDocumento: '1'
    },
    {
      idTipoParametro: '4',
      valorMinimo: 2,
      valorMaximo: 23,
      nombreAtributo: 'x',
      idTipoTrabajo: '2',
      codigoTipoPieza: 'tp1',
      idDocumento: '2'
    },
    {
      idTipoParametro: '5',
      valorMinimo: 5,
      valorMaximo: 9,
      nombreAtributo: 'h',
      idTipoTrabajo: '2',
      codigoTipoPieza: 'tp1',
      idDocumento: '2'
    },
    {
      idTipoParametro: '6',
      valorMinimo: 200,
      valorMaximo: 600,
      nombreAtributo: 'partciulasToma',
      idTipoTrabajo: '1',
      codigoTipoPieza: 'tp3',
      idDocumento: '3'
    },
    {
      idTipoParametro: '7',
      valorMinimo: 100,
      valorMaximo: 300,
      nombreAtributo: 'particulasSalida',
      idTipoTrabajo: '1',
      codigoTipoPieza: 'tp3',
      idDocumento: '3'
    },
    {
      idTipoParametro: '8',
      valorMinimo: 50,
      valorMaximo: 70,
      nombreAtributo: 'tope',
      idTipoTrabajo: '2',
      codigoTipoPieza: 'tp2',
      idDocumento: '4'
    },
    {
      idTipoParametro: '9',
      valorMinimo: 2,
      valorMaximo: 10,
      nombreAtributo: 'entrada',
      idTipoTrabajo: '2',
      codigoTipoPieza: 'tp2',
      idDocumento: '4'
    },
  ];


  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      res.status(200).json({
        message: 'Estos son los tipoParametros admitidos!',
        obj: this.tipoParametroStub
      })
    });

    this.router.get('/:idTipoTrabajo/:codigoTipoPieza',(req,res)=>{

      let idTipoTrabajo = req.params.idTipoTrabajo;
      let codigoTipoPieza = req.params.codigoTipoPieza;
      let resultado = [];
      if(idTipoTrabajo != null && codigoTipoPieza != null){
        for (let i = 0; i < this.tipoParametroStub.length; i++) {
            if(this.tipoParametroStub[i].idTipoTrabajo === idTipoTrabajo && this.tipoParametroStub[i].codigoTipoPieza === codigoTipoPieza){
              resultado.push(this.tipoParametroStub[i]);
            }
        }

        //Retornamos los tipoParametro que cumplen con el idTipoTrabajo e idTipoPieza requerido.
        res.status(200).json({
          message: 'TipoParametros filtrados con exito!',
          obj: resultado
        });
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
        for (let i = 0; i < this.tipoParametroStub.length; i++) {
            if(this.tipoParametroStub[i].idDocumento === idDocumento){
              resultado.push(this.tipoParametroStub[i]);
            }
        }
        res.status(200).json({
          message: 'TipoParametros filtrados con exito!',
          obj: resultado
        });
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
