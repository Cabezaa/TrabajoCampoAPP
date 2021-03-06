'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var OrdenServicio = require('./orden.model');
var TipoTrabajo = require('./tipoTrabajo.model');
var Pieza = require('./pieza.model');

var trabajo_schema = new Schema({
  numTrabajo: { type: String, required: true, unique: true },
  fechaRealizacion: Date,
  evaluacion: String,
  observaciones: String,
  ordenServicio: {type: Schema.ObjectId, ref: 'OrdenServicio',required: true},
  tipoTrabajo: {type: Schema.ObjectId, ref: 'TipoTrabajo', required: true},
  pieza: {type: Schema.ObjectId, ref: 'Pieza', required: true},
  cuilSupervisor: String
});

// El esquema solo no sirve. Luego, creamos el modelo
var Trabajo = mongoose.model('Trabajo',trabajo_schema);

module.exports = Trabajo;
