var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoParametro = require('./tipoParametro.model');
var Trabajo = require('./trabajo.model');

var resultado_schema = new Schema({
  valor: { type: Number, required: true },
  trabajo: {type: Schema.ObjectId, ref: 'Trabajo',required: true},
  tipoParametro: {type: Schema.ObjectId, ref: 'TipoParametro',required: true}
});

// El esquema solo no sirve. Luego, creamos el modelo
var Resultado = mongoose.model('Resultado',resultado_schema);

module.exports = Resultado;
