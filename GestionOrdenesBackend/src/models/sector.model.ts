'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var Empresa = require('./empresa.model');

var sector_schema = new Schema({
  IBM: { type: String, required: true, unique: true },
  Sector: String,
  Direccion: String,
  Telefono: String,
  perteneceA: {type: Schema.ObjectId, ref: 'Empresa',required: true}
});
// El esquema solo no sirve. Luego, creamos el modelo
var Sector = mongoose.model('Sector',sector_schema);

module.exports = Sector;
