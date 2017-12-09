'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var empresa_schema = new Schema({
  CUIT: { type: String, required: true, unique: true },
  Nombre: String,
  ResponsableFiscal: String,
  Direccion: String,
  Telefono: String,
});
// El esquema solo no sirve. Luego, creamos el modelo
var Empresa = mongoose.model('Empresa',empresa_schema);

module.exports = Empresa;
