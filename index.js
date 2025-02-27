// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// La ruta /api debe devolver fecha actual en milisegundos y fecha actual en fecha
app.get('/api',(req,res) => {
  let fecha = new Date();
  return res.json({unix:fecha.getTime(),utc:fecha.toUTCString()});
});

// Vamos a responder algo en la ruta /api/:date
app.get('/api/:date',(req,res) => {
  let date = req.params.date;
  let fecha;

  if(!isNaN(date)) {
    // Si el parametro es un numero convertir a numero(milisegundos)
    fecha = new Date(parseInt(date));
  }
  else {
    // Si es una fecha convertirla a fecha
    fecha = new Date(date);
  }

  // Verificar fecha válida
  if(isNaN(fecha.getTime())) {
    res.json({error: "Invalid Date"});
  }
  return res.json({unix:fecha.getTime(),utc:fecha.toUTCString()});
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
