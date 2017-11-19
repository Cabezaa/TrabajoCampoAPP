process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Documento = require('../models/documento.model');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect = chai.expect;
var _ = require('lodash');
// import _ from 'lodash';


chai.use(chaiHttp);


function existenEmpresas(empresas){
  return empresas.length > 0;
}

function sonEmpresas(empresas){


  // CUIT: { type: String, required: true, unique: true },
  // Nombre: String,
  // ResponsableFiscal: String,
  // Direccion: String,
  // Telefono: String,

  var todoPerfecto = true; // si es false, significa que hay un objeto que no es una empresa

  _.each(empresas,(empresa)=>{

    try{
      expect(empresa).to.have.property('CUIT');
      expect(empresa.CUIT).to.be.a('boolean');
    }catch(error){
      console.log(error);
      todoPerfecto = false;

    }
  });

  return todoPerfecto;
}

describe('TrabajoMasPedido', () => {

  // beforeEach((done) => { //Before each test we empty the database
  //   Documento.remove({}, (err) => {
  //     done();
  //   });
  // });


  /*
  * Test the /GET route
  */
  describe('/GET empresas', () => {
    it('Deberia devolver las empresas', (done) => {
      chai.request(server)
      .get('/movimientos/trabajoMasPedido/empresas')
      .end((err, res) => {

        res.should.have.status(200);
        res.body.obj.should.be.a('array');
        // res.body.obj.length.should.be.eql(0);

        expect(res.body.obj, 'no existen empresas en la BD?').to.satisfy((empresas) => existenEmpresas(empresas));
        expect(res.body.obj, 'hay algun infiltrado?').to.satisfy((empresas) => sonEmpresas(empresas));


        done();
      });
    });
  });



});
