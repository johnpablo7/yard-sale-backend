const express = require('express');

const productsRouter = require('../controllers/products.router');
const categoriesRouter = require('../controllers/categories.router');
const usersRouter = require('../controllers/users.router');
const orderRouter = require('../controllers/orders.router');
const customersRouter = require('../controllers/customers.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
