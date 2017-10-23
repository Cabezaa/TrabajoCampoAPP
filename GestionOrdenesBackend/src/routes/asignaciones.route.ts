import * as express from 'express';

var Asignacion = require('../models/asignacion.model');

class AsignacionesRoute {
  public express;
  public router;


  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.getAsignaciones();

  }


  private getAsignaciones(){
    this.router.get('/', (req, res) => {

      let periodo = null;

      // fechaInicio=01-01-2005&&fechaFin=02-02-2005
      if(req.query.fechaInicio && req.query.fechaFin){
        console.log('TENGO LAS FECHAS!!');
        let fechaInicio = new Date(req.query.fechaInicio);
        let fechaFin = new Date(req.query.fechaFin);

        periodo = [fechaInicio, fechaFin];

      }

      let expandirTrabajos = false;
      let expandirPersonal = false;

      // al estilo expandirTrabajos=true&&expandirPersonal=true
      if(req.query.expandirTrabajos && req.query.expandirPersonal){

        expandirTrabajos = true;
        expandirPersonal = true;

      }

      let consulta = {};
      let populateTrabajos = '';
      let populatePersonal = '';

      if( expandirTrabajos && expandirPersonal ){

        populatePersonal = 'personal';
        populateTrabajos = 'trabajo';

      }

      if(periodo){

        consulta["fechaAsignacion"] = {
          $gte : new Date(periodo[0].toISOString()),
          $lt : new Date(periodo[1].toISOString())
        };

      }

      Asignacion.find(consulta)
      .populate(populatePersonal, populateTrabajos)
      .exec( (err,asignaciones) => {
        if(err){
          return res.status(400).json({
            title: 'Error al buscar asignaciones!',
            error: err
          });
        }
        else{
          res.status(200).json({
            message: 'Estas son las asignaciones!',
            obj: asignaciones
          });
        }
      })
    });
  }


}


export default new AsignacionesRoute().router;
