'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orden_schema = new Schema({
  numOrden: { type: String, required: true, unique: true },
  fechaIngreso: Date,
  progresoTrabajo: String,
  observaciones: String,
});
// El esquema solo no sirve. Luego, creamos el modelo
var OrdenServicio = mongoose.model('OrdenServicio',orden_schema);

module.exports = OrdenServicio;
