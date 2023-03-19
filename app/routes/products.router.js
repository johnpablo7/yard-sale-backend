const express = require('express');
const auth = require('../utils/auth');

const ProductsService = require('../services/products.service');
const validatorHandler = require('../middleware/validator.handler');
const { checkRoles } = require('../middleware/auth.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get(
  '/',
  // auth.authenticate('jwt', { session: false }), // Sin auth.. y checkRoles los clientes pueden
  // checkRoles('admin', 'seller', 'customer'), // ver el producto sin autorizacion.
  // validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  // auth.authenticate('jwt', { session: false }),
  // checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.update(id, body);
      res.json(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
