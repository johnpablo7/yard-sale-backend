const express = require('express');
const auth = require('../utils/auth');

const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middleware/validator.handler');
const { checkRoles } = require('../middleware/auth.handler');
const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoriesService();

router.get(
  '/',
  auth.authenticate('jwt', { session: false }), // Sin auth.. y checkRoles los clientes pueden
  checkRoles('admin', 'seller', 'customer'), // ver el producto sin autorizacion.
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCategory = await service.update(id, body);
      res.json(updateCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  auth.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getCategorySchema, 'params'),
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
