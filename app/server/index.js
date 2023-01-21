const express = require('express');
const cors = require('cors');
const routerApi = require('../routes');

const {
  logErrors,
  ormErrorHandler,
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
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
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

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Sorry can't find that!" });
});

app.listen(port, () => {
  console.log('My port: ' + port);
});
