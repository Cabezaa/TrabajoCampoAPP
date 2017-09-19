'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoTrabajo_schema = new Schema({
  idTipoTrabajo: { type: String, required: true, unique: true },
  nombre: String,
  descripcion: String
});

// El esquema solo no sirve. Luego, creamos el modelo
var TipoTrabajo = mongoose.model('TipoTrabajo',tipoTrabajo_schema);

module.exports = TipoTrabajo;
