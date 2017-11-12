var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  env = process.env;

  var gestionOrdenes = require('./GestionOrdenes.route');


// Importamos las rutas
// import ObrasRoute from './routes/obras.route';


let app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  //  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



app.use('/public', express.static('public'));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/dist'));
app.use('/gestionOrdenes',gestionOrdenes);

app.get('/', function (req, res, next) {
  console.log("Servidor funcionadoooooooooooo");
  return res.status(200).json({msg:"Server Porxy corriendo correctamente"});
});

var server = http.createServer(app);
server.listen(process.env.PORT || 4000, function () {
  console.log("Servidor corriendo");
});

