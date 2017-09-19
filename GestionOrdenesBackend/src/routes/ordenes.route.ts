import * as express from 'express';

var OrdenServicio = require('../models/orden.model');

class OrdenesRoute {
  public express;
  public router;

  private ordenesStub = [
    {
      numOrden: '1',
      fechaIngreso: (new Date()),
      progresoTrabajo: '50',
      observaciones: ''
    },
    {
      numOrden: '2',
      fechaIngreso: (new Date(2017,7,8)),
      progresoTrabajo: '20',
      observaciones: ''
    },
    {
      numOrden: '3',
      fechaIngreso: (new Date(2017,5,5)),
      progresoTrabajo: '0',
      observaciones: ''
    }
  ];

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/seed', (req, res) => {

      for (let i = 0; i < this.ordenesStub.length; i++) {
          let docAux = new OrdenServicio({
            numOrden:  this.ordenesStub[i].numOrden,
            fechaIngreso:   this.ordenesStub[i].fechaIngreso,
            progresoTrabajo:   this.ordenesStub[i].progresoTrabajo,
            observaciones:   this.ordenesStub[i].observaciones
          });

          docAux.save().then(ordenNueva => {
            console.log('Orden de Servicio guardada con exito!!');
            console.log(ordenNueva);
          }, err => {
            console.log('Error al guardar el orden!!');
            console.log(err);
          })
      }
      res.status(200).json({
        message: 'Se han guardado ordenes en la base de datos!'
      });
    });

    this.router.get('/', (req, res) => {
      OrdenServicio.find()
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
    })
  }
}


export default new OrdenesRoute().router;
