const express = require('express');
const productsRouter = require('../controllers/products.router');
const categoriesRouter = require('../controllers/categories.router');
const usersRouter = require('../controllers/users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
