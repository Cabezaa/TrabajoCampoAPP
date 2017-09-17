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
      tipoTrabajo: {
        idTipoTrabajo: '1',
        nombre: 'Inspeccion particulas magnetizables',
        descripcion: 'Inspeccion por magnetizacion de particulas de las piezas.'
      },
      pieza:{
        numeroPieza: '1',
        tipoPieza: {
          codigoTipoPieza: 'tp1',
          nombre: 'caño curvo',
          descripcion: 'Un caño que tiene una seccion curva'
        }
      },
      cuilSupervisor: '400'
    },
    {
      numTrabajo: '2',
      fechaRealizacion: (new Date(2017,6,15)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '1',
      tipoTrabajo: {
        idTipoTrabajo: '2',
        nombre: 'Inspeccion por ultrasonido',
        descripcion: 'Inspeccion por ultrasonido de piezas.'
      },
      pieza:{
        numeroPieza: '2',
        tipoPieza: {
          codigoTipoPieza: 'tp1',
          nombre: 'caño curvo',
          descripcion: 'Un caño que tiene una seccion curva'
        }
      },
      cuilSupervisor: '400'
    },
    {
      numTrabajo: '3',
      fechaRealizacion: (new Date(2017,8,8)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '2',
      tipoTrabajo: {
        idTipoTrabajo: '1',
        nombre: 'Inspeccion particulas magnetizables',
        descripcion: 'Inspeccion por magnetizacion de particulas de las piezas.'
      },
      pieza:{
        numeroPieza: '3',
        tipoPieza: {
          codigoTipoPieza: 'tp3',
          nombre: 'Valvula de apertura',
          descripcion: 'Una valvula encargada de controlar la presion de los caños'
        }
      },
      cuilSupervisor: '500'
    },
    {
      numTrabajo: '4',
      fechaRealizacion: (new Date(2017,5,4)),
      Evaluacion: '',
      observaciones: '',
      numOrden: '3',
      tipoTrabajo: {
        idTipoTrabajo: '2',
        nombre: 'Inspeccion por ultrasonido',
        descripcion: 'Inspeccion por ultrasonido de piezas.'
      },
      pieza:{
        numeroPieza: '4',
        tipoPieza: {
          codigoTipoPieza: 'tp2',
          nombre: 'caño recto',
          descripcion: 'Un caño que normalmente transporta fluidos espesos corrosivos.'
        }
      },
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
