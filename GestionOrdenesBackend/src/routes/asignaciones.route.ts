import * as express from 'express';

var Asignacion = require('../models/asignacion.model');
var Trabajo = require('../models/trabajo.model');

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
      console.log('### --------------------')

      // fechaInicio=01-01-2005&&fechaFin=02-02-2005
      if(req.query.fechaInicio && req.query.fechaFin){
        // console.log('TENGO LAS FECHAS!!');
        // console.log(req.query.fechaInicio);
        // console.log(req.query.fechaFin);
        let fechaInicioAux = req.query.fechaInicio.split('-');

        let fechaInicio = new Date();
        fechaInicio.setDate(fechaInicioAux[0]);
        fechaInicio.setMonth(fechaInicioAux[1]-1);
        fechaInicio.setFullYear(fechaInicioAux[2]);

        let fechaFinAux  = req.query.fechaFin.split('-');

        let fechaFin = new Date();
        fechaFin.setDate(fechaFinAux[0]);
        fechaFin.setMonth(fechaFinAux[1]-1);
        fechaFin.setFullYear(fechaFinAux[2]);

        periodo = [fechaInicio, fechaFin];

        console.log(periodo)

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
      // {
      //   $match: {
      //     consulta
      //   }
      // },
      let resultado = Asignacion.collection.aggregate([
        {
          $match: {
            fechaAsignacion: (<any>consulta).fechaAsignacion
          }
        },
        {
          $lookup:
          {
            from: "personals",
            localField: "personal",
            foreignField: "_id",
            as: "personal"
          }
        },
        {
          $lookup:
          {
            from: "trabajos",
            localField: "trabajo",
            foreignField: "_id",
            as: "trabajo"
          }
        },
        { "$group": {
          _id: { personal: "$personal", progreso: '$progreso'},
          asignaciones: { $push:
            {
              idAsignacion: "$idAsignacion",
              instrumento: "$instrumento",
            }
          },
          count: { $sum: 1 }
        }}]);

        resultado.toArray(function(err, resultados){
          if(err){
            return res.status(400).json({
              title: 'Error al buscar asignaciones!',
              error: err
            });
          }
          // console.log('######## Resultado');
          // console.log(resultados);
          return res.status(200).json({
            message: 'Estas son las asignaciones!',
            obj: resultados
          });
        });

        // Asignacion.find(consulta)
        // .populate(populatePersonal, populateTrabajos)
        // .exec( (err,asignaciones) => {
        //   if(err){
        //     return res.status(400).json({
        //       title: 'Error al buscar asignaciones!',
        //       error: err
        //     });
        //   }
        //   else{
        //     res.status(200).json({
        //       message: 'Estas son las asignaciones!',
        //       obj: asignaciones
        //     });
        //   }
        // })
      });
    }


  }


  export default new AsignacionesRoute().router;
