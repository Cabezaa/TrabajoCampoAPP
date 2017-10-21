import * as express from 'express';

var Empresas = require('../models/empresas.model');

class EmpresasRoute {
  public express;
  public router;


  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      Empresas.find()
      .exec( (err,empresas) => {
        if(err){
          return res.status(404).json({
            title: 'Error al buscar las empresas!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son las empresas!',
            obj: empresas
          });
        }
      })
    })
  }
}


export default new EmpresasRoute().router;
