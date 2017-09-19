import * as express from 'express';

var Documento = require('../models/documento.model');

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

      Documento.find()
      .exec( (err,documentos) => {
          if(err){
            return res.status(404).json({
                title: 'Error al buscar documentos!',
                error: err
            });
          }
          else{
            res.status(200).json({
            message: 'Estas son los documentos!',
            obj: documentos
        });
          }
      })
    });

    this.router.get('/seed', (req, res) => {

      for (let i = 0; i < this.documentosStub.length; i++) {
          let docAux = new Documento({
            idDocumento:  this.documentosStub[i].idDocumento,
            descripcion:   this.documentosStub[i].descripcion,
            linkArchivo:   this.documentosStub[i].linkArchivo,
            nombreArchivo:   this.documentosStub[i].nombreArchivo
          });

          docAux.save().then(documentoNuevo => {
            console.log('Documento guardado con exito!!');
            console.log(documentoNuevo);
          }, err => {
            console.log('Error al guardar el documento!!');
            console.log(err);
          })
      }
      res.status(200).json({
        message: 'Se han guardado documentos en la base de datos!'
      });
    });

    this.router.get('/:idDocumento',(req,res)=>{
      let idDocumento = req.params.idDocumento;
      if(idDocumento != null){

        Documento.findOne({'idDocumento': idDocumento})
        .exec( (err, documento) => {
            if(err){
              return res.status(404).json({
                  title: 'Error al buscar el documento!',
                  error: err
              });
            }
            else{
              res.status(200).json({
              message: 'Este es el documento buscado!',
              obj: documento
          });
            }
        })

      }
      else{
        return res.status(400).json({
          title: 'Error',
          error: 'No existe un documento con tal id del docmento!!'
        });
      }
    });
  }
}


export default new DocumentosRoute().router;
