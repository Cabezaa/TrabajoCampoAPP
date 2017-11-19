process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Documento = require('../models/documento.model');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('Documentos', () => {
  beforeEach((done) => { //Before each test we empty the database
    Documento.remove({}, (err) => {
      done();
    });
  });
  /*
  * Test the /GET route
  */
  describe('/GET documentos', () => {
    it('it should GET all the documentos', (done) => {
      chai.request(server)
      .get('/documentos')
      .end((err, res) => {

        res.should.have.status(200);
        res.body.obj.should.be.a('array');
        res.body.obj.length.should.be.eql(0);
        done();
      });
    });
  });

  /*
  * Test the /POST route
  */
  // describe('/POST documentos', () => {
  //     it('it should not POST a documento sin un idDocumento', (done) => {
  //
  //       let documento = {
  //           descripcion: "ISO para ....",
  //           linkArchivo: "./documentos/isos/iso7000",
  //           nombreArchivo: "iso7000"
  //       }
  //
  //       chai.request(server)
  //           .post('/documentos')
  //           .send(documento)
  //           .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.obj.should.be.a('object');
  //               res.body.should.have.property('errors');
  //               res.body.errors.should.have.property('pages');
  //               res.body.errors.pages.should.have.property('kind').eql('required');
  //             done();
  //           });
  //     });
  //
  // });


});
