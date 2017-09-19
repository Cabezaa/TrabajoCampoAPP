'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trabajo = require('./trabajo.model');

var asignacion_schema = new Schema({
  idAsignacion: { type: String, required: true, unique: true },
  progreso: Number,
  fechaAsignacion: Date,
  personal: String,
  trabajo: {type: Schema.ObjectId, ref: 'Trabajo',required: true},
  instrumento: String
});
// El esquema solo no sirve. Luego, creamos el modelo
var Asignacion = mongoose.model('Asignacion',asignacion_schema);

module.exports = Asignacion;
