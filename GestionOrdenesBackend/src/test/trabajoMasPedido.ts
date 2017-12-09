process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// var Documento = require('../models/documento.model');

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
      expect(empresa.CUIT).to.be.a('string');
    }catch(error){
      // console.log(error);
      todoPerfecto = false;

    }
  });

  return todoPerfecto;
}

function comprobarError(objetoResultado){

  var objeto = objetoResultado;

  try{
    expect(objeto).to.have.property('nombre');
    expect(objeto.nombre).to.be.a('string');

    expect(objeto).to.have.property('cantidad');
    expect(objeto.cantidad).to.be.a('number');

    return true;
  }catch(error){
    // console.log(error);
    return false;
  }
}

describe('TrabajoMasPedido', () => {

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

  describe('/GET cantidad de trabajos', () => {
    it('Deberia devolver la cantidad de trabajos mayor de la empresa', (done) => {

      let id_empresa = "59eb9507fa852fd59d53d29a";
      chai.request(server)
      .get(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`)
      .end((err, res) => {

        res.should.have.status(200);
        res.body.obj.should.be.a('object');
        // res.body.obj.length.should.be.eql(0);

        expect(res.body.obj, 'No posee errores y es un objeto valido').to.satisfy((objetoResultado) => comprobarError(objetoResultado));


        done();
      });
    });

    it('Deberia devolver un error, pues envio cadena vacia', (done)=> {

      let id_empresa = '';
      chai.request(server)
      .get(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`)
      .end((err,res)=> {
        res.should.have.status(404);
        res.body.should.be.a('object');

        done();
      });

    });

    it('Deberia devolver un error, pues envio otro tipo de dato', (done)=> {

      let id_empresa = 202135;
      chai.request(server)
      .get(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`)
      .end((err,res)=> {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');

        done();
      });

    });

    it('Deberia devolver un error, pues envio un dato de 12bytes que no es objectID', (done)=> {

      let id_empresa = '1234567890123';
      chai.request(server)
      .get(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`)
      .end((err,res)=> {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');

        done();
      });

    });
    it('Deberia devolver un error, pues envio un dato de 11bytes', (done)=> {

      let id_empresa = '59c093aa1ddb97486e27a15';
      chai.request(server)
      .get(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`)
      .end((err,res)=> {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');
        done();
      });

    });
    it('Deberia devolver un error, pues envio un dato de 13bytes', (done)=> {

      let id_empresa = '59c093aa1ddb97486e27a1511';
      chai.request(server)
      .get(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`)
      .end((err,res)=> {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('error');
        done();
      });

    });


  });



});
