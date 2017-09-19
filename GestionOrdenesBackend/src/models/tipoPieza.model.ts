var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoPieza_schema = new Schema({
  codigoTipoPieza: { type: String, required: true, unique: true },
  nombre: String,
  descripcion: String
});

// El esquema solo no sirve. Luego, creamos el modelo
var TipoPieza = mongoose.model('TipoPieza',tipoPieza_schema);

module.exports = TipoPieza;
