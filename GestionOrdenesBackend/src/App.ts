import * as express from 'express';
var bodyParser = require('body-parser')

// Importamos las rutas
import ObrasRoute from './routes/obras.route';
import TrabajosRoute from './routes/trabajos.route';
import OrdenesRoute from './routes/ordenes.route';
import DocumentosRoute from './routes/documentos.route';
import ResultadosRoute from './routes/resultados.route';
import TipoParametroRoute from './routes/tiposParametro.route';

class App {
  public express

  constructor () {
    this.express = express();
    this.express.use(bodyParser.json());
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.json({
        message: 'Bienvenido a la aplicacion!'
      })
    })
    this.express.use('/', router);
    this.express.use('/obras', ObrasRoute);
    this.express.use('/trabajos', TrabajosRoute);
    this.express.use('/ordenes', OrdenesRoute);
    this.express.use('/documentos', DocumentosRoute);
    this.express.use('/resultados', ResultadosRoute);
    this.express.use('/tipoparametro', TipoParametroRoute);
  }
}

export default new App().express
