process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

function esTrabajo(trabajo){

}
function sonTrabajos(trabajos){

}

function esOrden(orden){
  expect(orden).to.have.property('numOrden');
}

function sonOrdenes(ordenes){
  ordenes.forEach((ord) => {
    esOrden(ord);
  });
}

describe('Movimiento Finalizar Trabajo', () => {

  /*

  */
  describe('/GET ordenes', () => {

    it('Deberia devolver las ordenes', (done)=> {

      chai.request(server)
      .get('/movimientos/finalizarTrabajo/ordenes')
      .end((err,res)=> {

        if(err){
          console.log('err');
          // console.log(err);
          done()
        }

        res.should.have.status(200);
        res.body.obj.should.be.a('array');

        sonOrdenes(res.body.obj);

        done();
      });

    });

  })

  describe('/GET /trabajos/:numOrden', () => {

    it('Deberia devolver las trabajos de una orden', (done)=> {

      // id_orden real
      let id_orden = "59c093aa1ddb97486e27a151";

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`)
      .end((err,res)=> {

        if(err){
          // console.log('err');
          // console.log(err);
          done()
        }


        // console.log('Respuesta', res.body.obj);
        res.should.have.status(200);
        res.body.obj.should.be.a('array');

        // Comprobamos que el arreglo sea de trabajos
        sonTrabajos(res.body.obj);

        done();
      });

    });

    it('Deberia devolver un error, pues envio cadena vacia', (done)=> {

      // id_orden real
      let id_orden = '';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`)
      .end((err,res)=> {

        // if(err){
        //   console.log('err');
        //   console.log(err);
        //   done()
        // }
        // console.log('Err', err);
        // console.log('Respuesta', res.body);
        res.should.have.status(404);
        res.body.should.be.a('object');

        done();
      });

    });
    it('Deberia devolver un error, pues envio otro tipo de dato', (done)=> {

      // id_orden real
      let id_orden = '20';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`)
      .end((err,res)=> {

        // if(err){
        //   console.log('err');
        //   console.log(err);
        //   done()
        // }

        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');

        done();
      });

    });

    it('Deberia devolver un error, pues envio un dato de 12bytes que no es objectID', (done)=> {

      // id_orden real
      let id_orden = '1234567890123';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`)
      .end((err,res)=> {

        // if(err){
        //   console.log('err');
        //   console.log(err);
        //   done()
        // }

        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');

        done();
      });

    });
    it('Deberia devolver un error, pues envio un dato de 11bytes', (done)=> {

      // id_orden real
      let id_orden = '59c093aa1ddb97486e27a15';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`)
      .end((err,res)=> {

        // if(err){
        //   console.log('err');
        //   console.log(err);
        //   done()
        // }

        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');

        done();
      });

    });
    it('Deberia devolver un error, pues envio un dato de 13bytes', (done)=> {

      // id_orden real
      let id_orden = '59c093aa1ddb97486e27a1511';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`)
      .end((err,res)=> {

        // if(err){
        //   console.log('err');
        //   console.log(err);
        //   done()
        // }

        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');

        done();
      });

    });

  });

  describe('GET /tiposParametro/tiposTrabajo/:idTipoTrabajo/tiposPieza/:codigoTipoPieza', () => {

    it('Deberia devolver todo correctamente', (done)=> {

      let idTipoTrabajo = '59c08ff507e67d44d12cf067';
      let codigoTipoPieza = '59c090bcd302460237fe952e';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${idTipoTrabajo}/tiposPieza/${codigoTipoPieza}`)
      .end((err,res)=> {

        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver error ya que envio ambos parametros nulos', (done)=> {

      let idTipoTrabajo = '';
      let codigoTipoPieza = '';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${idTipoTrabajo}/tiposPieza/${codigoTipoPieza}`)
      .end((err,res)=> {

        res.should.have.status(404);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver error ya que no son strings los parametros', (done)=> {

      let idTipoTrabajo = 10;
      let codigoTipoPieza = 13;

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${idTipoTrabajo}/tiposPieza/${codigoTipoPieza}`)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver error ya que no son ObjectId los parametros', (done)=> {

      let idTipoTrabajo = '1234567890123';
      let codigoTipoPieza = '1234567890123';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${idTipoTrabajo}/tiposPieza/${codigoTipoPieza}`)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver error ya que los parametros es una cadena menor a 12 bytes', (done)=> {

      let idTipoTrabajo = '507f1f77bcf86cd79943901';
      let codigoTipoPieza = '507f1f77bcf86cd79943901';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${idTipoTrabajo}/tiposPieza/${codigoTipoPieza}`)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });


    it('Deberia devolver error ya que los parametros es una cadena mayor a 12 bytes', (done)=> {

      let idTipoTrabajo = '507f1f77bcf86cd7994390111';
      let codigoTipoPieza = '507f1f77bcf86cd7994390111';

      chai.request(server)
      .get(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${idTipoTrabajo}/tiposPieza/${codigoTipoPieza}`)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });
  });

  describe('POST /resultados', () => {

    it('Deberia devolver todo correctamente', (done)=> {


      let payload = {
        "trabajo":"59c095d7d302460237fe96e2",
        "fechaRealizacion":"2017-12-03T19:58:53.695Z",
        "resultados":[
          {"valor":232,
          "tipoParametro":{
            "_id":"59c09dc5d302460237fe9ad7",
            "idTipoParametro":"8",
            "valorMinimo":50,
            "valorMaximo":70,
            "nombreAtributo":"tope",
            "tipoTrabajo":{
              "_id":"59c08ff507e67d44d12cf068",
              "idTipoTrabajo":"2",
              "nombre":"Inspeccion por ultrasonido",
              "descripcion":"Inspeccion por ultrasonido de piezas.",
              "__v":0
            },
            "tipoPieza":{
              "_id":"59c0910bd302460237fe9558",
              "codigoTipoPieza":"tp2",
              "nombre":"caño recto",
              "descripcion":"Un caño que normalmente transporta fluidos espesos corrosivos.",
              "__v":0
            },
            "documento":{
              "_id":"59c09cb7d302460237fe9a3d",
              "idDocumento":"4",
              "descripcion":"documento numero 4",
              "linkArchivo":"/carpeta4",
              "nombreArchivo":"iso13131",
              "__v":0
            },
            "valor":"232"
          }
        },
        {
          "valor":123,
          "tipoParametro":{
            "_id":"59c09dcbd302460237fe9ade",
            "idTipoParametro":"9",
            "valorMinimo":2,
            "valorMaximo":10,
            "nombreAtributo":"entrada",
            "tipoTrabajo":{
              "_id":"59c08ff507e67d44d12cf068",
              "idTipoTrabajo":"2",
              "nombre":"Inspeccion por ultrasonido",
              "descripcion":"Inspeccion por ultrasonido de piezas.",
              "__v":0
            },
            "tipoPieza":{
              "_id":"59c090ecd302460237fe9541",
              "codigoTipoPieza":"tp3",
              "nombre":"Valvula de apertura",
              "descripcion":"Una valvula encargada de controlar la presion de los caños.",
              "__v":0
            },
            "documento":{
              "_id":"59c09cb7d302460237fe9a3d",
              "idDocumento":"4",
              "descripcion":"documento numero 4",
              "linkArchivo":"/carpeta4",
              "nombreArchivo":"iso13131",
              "__v":0
            },
            "valor":"123"
          }
        }
        ]
      };

      // let payload2 = JSON.parse(payload);
      chai.request(server)
      .post(`/movimientos/finalizarTrabajo/resultados`)
      .set('content-type', 'application/json')
      .send(payload)
      .end((err,res)=> {

        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      });

    });


    it('Deberia devolver un error ya que los resultados no son una lista, o porque no es un ObjectID valido', (done)=> {


      let payload = {
        "trabajo":"12",
        "resultados":
          {"valor":232,
          "tipoParametro":{
            "_id":"59c09dc5d302460237fe9ad7",
            "idTipoParametro":"8",
            "valorMinimo":50,
            "valorMaximo":70,
            "nombreAtributo":"tope",
            "tipoTrabajo":{
              "_id":"59c08ff507e67d44d12cf068",
              "idTipoTrabajo":"2",
              "nombre":"Inspeccion por ultrasonido",
              "descripcion":"Inspeccion por ultrasonido de piezas.",
              "__v":0
            },
            "tipoPieza":{
              "_id":"59c0910bd302460237fe9558",
              "codigoTipoPieza":"tp2",
              "nombre":"caño recto",
              "descripcion":"Un caño que normalmente transporta fluidos espesos corrosivos.",
              "__v":0
            },
            "documento":{
              "_id":"59c09cb7d302460237fe9a3d",
              "idDocumento":"4",
              "descripcion":"documento numero 4",
              "linkArchivo":"/carpeta4",
              "nombreArchivo":"iso13131",
              "__v":0
            },
            "valor":"232"
          }
        }
      };

      chai.request(server)
      .post(`/movimientos/finalizarTrabajo/resultados`)
      .set('content-type', 'application/json')
      .send(payload)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver un error ya que ambos parametros son nulos', (done)=> {

      let payload = { };

      chai.request(server)
      .post(`/movimientos/finalizarTrabajo/resultados`)
      .set('content-type', 'application/json')
      .send(payload)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });


    it('Deberia devolver un error ya que los resultados no son objetos resultados, o porque no es un ObjectID valido', (done)=> {


      let payload = {
        "trabajo":"1234567890123",
        "resultados": [12,33]
      };

      chai.request(server)
      .post(`/movimientos/finalizarTrabajo/resultados`)
      .set('content-type', 'application/json')
      .send(payload)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });


    it('Deberia devolver un error ya que los resultados no son objetos resultados, o porque el ObjectID tiene 11 bytes', (done)=> {


      let payload = {
        "trabajo":"507f1f77bcf86cd79943901",
        "resultados": [12,33]
      };

      chai.request(server)
      .post(`/movimientos/finalizarTrabajo/resultados`)
      .set('content-type', 'application/json')
      .send(payload)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver un error ya que los resultados no son objetos resultados, o porque el ObjectID tiene 13 bytes', (done)=> {


      let payload = {
        "trabajo":"507f1f77bcf86cd7994390111",
        "resultados": [12,33]
      };

      chai.request(server)
      .post(`/movimientos/finalizarTrabajo/resultados`)
      .set('content-type', 'application/json')
      .send(payload)
      .end((err,res)=> {

        res.should.have.status(400);
        res.body.should.be.a('object');

        done();
      });

    });

  })




});
