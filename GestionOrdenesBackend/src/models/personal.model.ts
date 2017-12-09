'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;


var personal_schema = new Schema({
  cuil: { type: String, required: true, unique: true },
  nombre: String,
  apellido: String,
  telefonos: [String],
  direccion: String,
  puesto: String
});

// El esquema solo no sirve. Luego, creamos el modelo
var Personal = mongoose.model('Personal',personal_schema);

module.exports = Personal;
