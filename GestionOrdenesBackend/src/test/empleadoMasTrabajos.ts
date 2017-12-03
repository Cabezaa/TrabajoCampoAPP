process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect = chai.expect;
var _ = require('lodash');
// import _ from 'lodash';


chai.use(chaiHttp);

// cuil: { type: String, required: true, unique: true },
// nombre: String,
// apellido: String,
// telefonos: [String],
// direccion: String,
// puesto: String

function comprobarErrorTrabajador(objetoResultado){

    var objeto = objetoResultado;
    console.log('************************************************ comprobar Error trabajador');
    console.log(objetoResultado);

    let personal = objeto._id.personal[0];
    console.log(personal)

    try{
      console.log('### CUIL');
      console.log(personal.cuil)
      // expect(personal).to.have.property('cuil');
      // expect(personal.cuil).to.be.a('string');

      // expect(personal).to.have.property('nombre');
      // expect(personal.nombre).to.be.a('string');
      //
      // expect(personal).to.have.property('apellido');
      // expect(personal.apellido).to.be.a('string');
      //
      // expect(personal).to.have.property('telefonos');
      // expect(personal.telefonos).to.be.a('array');
      //
      // expect(personal).to.have.property('direccion');
      // expect(personal.direccion).to.be.a('string');
      //
      // expect(personal).to.have.property('puesto');
      // expect(personal.puesto).to.be.a('string');
      console.log('####### PASEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe')
      return true;
    }catch(error){
      console.log('#### ERROR')
      console.log(error);
      return false;
    }
  }

describe('EmpleadoMasTrabajos', () => {

    /*
    * Test the /GET route
    */
    describe('/GET empleado mas trabajos', () => {
      it('Deberia devolver al empleado que mas trabajo en un periodo', (done) => {

        let fechaInicio = '01-01-2017';
        let fechaFin = '20-12-2017';
        chai.request(server)
        .get(`/movimientos/empleadoMasTrabajos/empleado`).
        query({
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        })
        .end((err, res) => {

          res.should.have.status(200);
          res.body.obj.should.be.a('object');
          // res.body.obj.length.should.be.eql(0);

          let objeto = res.body.obj;
          let personal = objeto._id.personal[0];

          expect(personal).to.have.property('cuil');
          expect(personal.cuil).to.be.a('string');

          expect(personal).to.have.property('nombre');
          expect(personal.nombre).to.be.a('string');

          expect(personal).to.have.property('apellido');
          expect(personal.apellido).to.be.a('string');

          expect(personal).to.have.property('telefonos');
          expect(personal.telefonos).to.be.a('array');

          expect(personal).to.have.property('direccion');
          expect(personal.direccion).to.be.a('string');

          expect(personal).to.have.property('puesto');
          expect(personal.puesto).to.be.a('string');

          done();
        });
      });

      it('Deberia devolver un error, pues la fecha fin no puede ser menor a la de inicio', (done)=> {

        let fechaInicio = '20-11-2017';
        let fechaFin = '10-08-2017';
        chai.request(server)
        .get(`/movimientos/empleadoMasTrabajos/empleado`).
        query({
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        })
        .end((err,res)=> {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('error');

          done();
        });

      });

      it('Deberia devolver un error, ambas fechas son nulas', (done)=> {

        let fechaInicio = '';
        let fechaFin = '';
        chai.request(server)
        .get(`/movimientos/empleadoMasTrabajos/empleado`).
        query({
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        })
        .end((err,res)=> {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('error');

          done();
        });

      });

      it('Deberia devolver un error, pues las fechas no contienen un formato valido', (done)=> {

        let fechaInicio = '2017/08/10';
        let fechaFin = '2017/11/20';
        chai.request(server)
        .get(`/movimientos/empleadoMasTrabajos/empleado`).
        query({
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        })
        .end((err,res)=> {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('error');

          done();
        });

      });

      it('Deberia devolver un error, pues envio dos valores que no son fechas', (done)=> {

        let fechaInicio = 20;
        let fechaFin = 41;
        chai.request(server)
        .get(`/movimientos/empleadoMasTrabajos/empleado`).
        query({
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        })
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
