import * as express from 'express';
var bodyParser = require('body-parser')
var cors = require('cors')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BM');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexion con Mongo:'));
db.once('open', function() {
  console.log('Base de datos Mongo: BM conectada');
});

// Importamos las rutas
import ObrasRoute from './routes/obras.route';
import TrabajosRoute from './routes/trabajos.route';
import OrdenesRoute from './routes/ordenes.route';
import DocumentosRoute from './routes/documentos.route';
import ResultadosRoute from './routes/resultados.route';
import TipoParametroRoute from './routes/tiposParametro.route';
import EmpresasRoute from './routes/empresas.route';
import SectoresRoute from './routes/sectores.route';
import AsignacionesRoute from './routes/asignaciones.route';
import FinalizarTrabajo from './movimientos/finalizarTrabajo';
import TrabajoMasPedido from './movimientos/TrabajoMasPedido';
import EmpleadoMasTrabajos from './movimientos/empleadoMasTrabajos';

class App {
  public express
  constructor () {
    this.express = express();
    this.express.use(cors());
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
    this.express.use('/empresas', EmpresasRoute);
    this.express.use('/sectores', SectoresRoute);
    this.express.use('/asignaciones', AsignacionesRoute);
    this.express.use('/movimientos/finalizarTrabajo', FinalizarTrabajo);
    this.express.use('/movimientos/trabajoMasPedido', TrabajoMasPedido);
    this.express.use('/movimientos/empleadoMasTrabajos', EmpleadoMasTrabajos);
  }
}

export default new App().express
