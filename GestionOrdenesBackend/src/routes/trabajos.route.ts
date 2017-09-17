import * as express from 'express';

class TrabajosRoute {
  public express;
  public router;

  private trabajosStub = [
    {
      numTrabajo: '1',
      fechaRealizacion:(new Date(2017,8,1)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '1',
      idTipoTrabajo: '1',
      cuilSupervisor: '400'
    },
    {
      numTrabajo: '2',
      fechaRealizacion: (new Date(2017,6,15)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '1',
      idTipoTrabajo: '2',
      cuilSupervisor: '400'
    },
    {
      numTrabajo: '3',
      fechaRealizacion: (new Date(2017,8,8)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '2',
      idTipoTrabajo: '1',
      cuilSupervisor: '500'
    },
    {
      numTrabajo: '4',
      fechaRealizacion: (new Date(2017,5,4)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '3',
      idTipoTrabajo: '2',
      cuilSupervisor: '400'
    }
  ];

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      res.status(200).json({
        message: 'Estas son los trabajos!',
        obj: this.trabajosStub
      })
    })
  }
}


export default new TrabajosRoute().router;
