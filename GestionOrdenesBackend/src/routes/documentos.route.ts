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
      });
    });

    this.router.get('/:idDocumento',(req,res)=>{
      let idDocumento = req.params.idDocumento;
      if(idDocumento != null){
        for (let i = 0; i < this.documentosStub.length; i++) {
            if(this.documentosStub[i].idDocumento===idDocumento){
              res.status(200).json({
                message: 'El documento seleccionado es el siguiente!',
                obj: this.documentosStub[i]
              });
            }
        }
      }
      else{
        return res.status(400).json({
          title: 'Error',
          error: 'El idDocumento brindado no es correcto!'
        });
      }
    });
  }
}


export default new DocumentosRoute().router;
