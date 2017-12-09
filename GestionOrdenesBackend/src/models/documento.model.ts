'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var documento_schema = new Schema({
  idDocumento: { type: String, required: true, unique: true },
  descripcion: String,
  linkArchivo: String,
  nombreArchivo: String
});

// El esquema solo no sirve. Luego, creamos el modelo
var Documento = mongoose.model('Documento',documento_schema);

module.exports = Documento;
