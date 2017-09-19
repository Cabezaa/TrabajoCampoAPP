var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoPieza = require('./tipoPieza.model');
var TipoTrabajo = require('./tipoTrabajo.model');
var Documento = require('./documento.model');

var tipoParametro_schema = new Schema({
  idTipoParametro: { type: String, required: true, unique: true },
  valorMinimo: Number,
  valorMaximo: Number,
  nombreAtributo: String,
  tipoTrabajo: {type: Schema.ObjectId, ref: 'TipoTrabajo',required: true},
  tipoPieza: {type: Schema.ObjectId, ref: 'TipoPieza',required: true},
  documento: {type: Schema.ObjectId, ref: 'Documento',required: true}
});

// El esquema solo no sirve. Luego, creamos el modelo
var TipoParametro = mongoose.model('TipoParametro',tipoParametro_schema);

module.exports = TipoParametro;
