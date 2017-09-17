import * as express from 'express';

class ObrasRoute {
  public express;
  public router;

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.router = express.Router();

    this.router.get('/', (req, res) => {
      res.json({
        message: 'Estas son las obras!'
      })
    })
  }
}


export default new ObrasRoute().router;
