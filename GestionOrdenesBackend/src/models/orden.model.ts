'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var Sector = require('./sector.model');

var orden_schema = new Schema({
  numOrden: { type: String, required: true, unique: true },
  fechaIngreso: Date,
  progresoTrabajo: {type: String, default: 'En curso'},
  observaciones: String,
  encargadaPor: {type: Schema.ObjectId, ref: 'Sector',required: true}
});
// El esquema solo no sirve. Luego, creamos el modelo
var OrdenServicio = mongoose.model('OrdenServicio',orden_schema);

module.exports = OrdenServicio;
