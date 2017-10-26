import * as express from 'express';

var Sectores = require('../models/sector.model');

class SectoresRoute {
  public express;
  public router;


  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      Sectores.find()
      .exec( (err,sectores) => {
        if(err){
          return res.status(404).json({
            title: 'Error al buscar los sectores!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son los sectores!',
            obj: sectores
          });
        }
      })
    });

    this.router.get('/:idEmpresa',(req,res)=>{

      let id_empresa = req.params.idEmpresa;
      Sectores.find(
        {
          perteneceA: id_empresa
        }
      ).exec((err,sectores)=>{
        if(err){
          return res.status(404).json({
            title: 'Error al buscar los sectores!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son los sectores!',
            obj: sectores
          });
        }
      })
    })



  }
}


export default new SectoresRoute().router;
