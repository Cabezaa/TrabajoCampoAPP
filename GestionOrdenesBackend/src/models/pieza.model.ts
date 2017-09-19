var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoPieza = require('./tipoPieza.model');

var pieza_schema = new Schema({
  numeroPieza: { type: String, required: true, unique: true },
  tipoPieza: {type: Schema.ObjectId, ref: 'TipoPieza',required: true}
});

// El esquema solo no sirve. Luego, creamos el modelo
var Pieza = mongoose.model('Pieza',pieza_schema);

module.exports = Pieza;
