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

  })

});
