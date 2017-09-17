import * as express from 'express';

class DocumentosRoute {
  public express;
  public router;

  private documentosStub = [
    {
      idDocumento: '1',
      descripcion: 'documento numero 1',
      linkArchivo: '/carpeta',
      nombreArchivo: 'iso1903'
    },
    {
      idDocumento: '2',
      descripcion: 'documento numero 2',
      linkArchivo: '/carpeta',
      nombreArchivo: 'iso1904'
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
        message: 'Estas son los documentos!',
        obj: this.documentosStub
      })
    })
  }
}


export default new DocumentosRoute().router;
