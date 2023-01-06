const express = require('express');
const cors = require('cors');
const routerApi = require('../routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('../middleware/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'http://127.0.0.1:5500',
  'https://yard-sale-node-production.up.railway.app',
];
const options = {
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('without permission'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta o Endpoint');
});

app.get('/home', (req, res) => {
  res.send('Aquí encontrarás nuestra página principal');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
});
