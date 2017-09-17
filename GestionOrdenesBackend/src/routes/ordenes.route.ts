import * as express from 'express';

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

    this.router.get('/', (req, res) => {
      res.status(200).json({
        message: 'Estas son las ordenes!',
        obj: this.ordenesStub
      })
    })
  }
}


export default new OrdenesRoute().router;
