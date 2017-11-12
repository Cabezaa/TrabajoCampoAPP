var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

router.get('/', (req, res) => {

  return res.status(200).json({ msg: "Router funcionando" });
});

router.get('/recursos/ordenes', (req, res) => {
  var opciones = getOption("/ordenes", 3000);
  getRaw(opciones).then((response) => {
    // console.log("el response es... ", response);
    // let resultado = response;
    let resultado = JSON.parse(response);
    // console.log("el resultado es...");
    // console.log(resultado);
    return res.status(200).json(resultado);
  });
});

router.get('/movimientos/finalizarTrabajo/ordenes', (req, res) => {
  var opciones = getOption("/movimientos/finalizarTrabajo/ordenes", 3000);
  getRaw(opciones).then((response) => {
    let resultado = JSON.parse(response);
    return res.status(200).json(resultado);
  });
});

router.get('/movimientos/finalizarTrabajo/trabajos/:numOrden', (req, res) => {
  let id_orden = req.params.numOrden;
  var opciones = getOption(`/movimientos/finalizarTrabajo/trabajos/${id_orden}`, 3000);
  getRaw(opciones).then((response) => {
    let resultado = JSON.parse(response);
    return res.status(200).json(resultado);
  });
});

router.get('/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/:idTipoTrabajo/tiposPieza/:codigoTipoPieza', (req, res) => {
  let id_tipoTrabajo = req.params.idTipoTrabajo;
  let id_tipoPieza = req.params.codigoTipoPieza;
  var opciones = getOption(`/movimientos/finalizarTrabajo/tiposParametro/tiposTrabajo/${id_tipoTrabajo}/tiposPieza/${id_tipoPieza}`, 3000);
  getRaw(opciones).then((response) => {
    let resultado = JSON.parse(response);
    return res.status(200).json(resultado);
  }).catch(err => {
    console.log("Explotoooo todoooo", err);
  });
});

router.post('/movimientos/finalizarTrabajo/resultados', (req, res) => {

  postContent('/movimientos/finalizarTrabajo/resultados',3000,req.body,req.headers).then( (response) => {
    return res.status(200).json(response);
  }).catch(err=>{console.log(err)});

});

router.get('/movimientos/empleadoMasTrabajos/empleado', (req, res) => {
  var opciones = getOption(`/movimientos/empleadoMasTrabajos/empleado`, 3000);
  getRaw(opciones).then((response) => {
    let resultado = JSON.parse(response);
    return res.status(200).json(resultado);
  });
});

router.get('/movimientos/trabajoMasPedido/empresas', (req, res) => {
  var opciones = getOption(`/movimientos/trabajoMasPedido/empresas`, 3000);
  getRaw(opciones).then((response) => {
    let resultado = JSON.parse(response);
    return res.status(200).json(resultado);
  });
});

router.get('/movimientos/trabajoMasPedido/calcular/:idEmpresa', (req, res) => {
  let id_empresa = req.params.idEmpresa;
  var opciones = getOption(`/movimientos/trabajoMasPedido/calcular/${id_empresa}`, 3000);
  getRaw(opciones).then((response) => {
    let resultado = JSON.parse(response);
    return res.status(200).json(resultado);
  });
});


function postContent(url, puerto, postData, headers) {

  // return new pending promise
  return new Promise((resolve, reject) => {

    //optiones para request post
    var options = {
      method: 'post',
      body: postData, // Javascript object
      json: true, // Use,If you are sending JSON data
      url: "http://localhost:3000"+url,
      headers: {
        // Specify headers, If any
        headers
      }
    };

    request(options, (err, response, body) => {
      // handle http errors
      if (err) {
        reject(err);
      }
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      //devuelve respuesta post
      resolve(body);
    });

  })
};



function checkErrors(response) {
  const { statusCode } = response;
  const contentType = response.headers['content-type'];
  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
  }
  return error;
}

function getOption(url, puerto) {
  return {
    hostname: "localhost",
    port: puerto,
    path: url,
    agent: false  // create a new agent just for º one request
  }
}

function getRaw(url) {

  return new Promise((resolve, reject) => {
    http.get(url, (response) => {

      const error = checkErrors(response);
      if (error) {
        reject(error);
      } else {
        let rawData = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', () => {
          resolve((rawData))
        });
      }

    }).on('error', (err) => reject(err))
  })
};

module.exports = router;