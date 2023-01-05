const express = require('express');
const CategoriesService = require('../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const category = service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateCategory = await service.update(id, body);
    res.json(updateCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteCategory = await service.delete(id);
  res.json(deleteCategory);
});

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;
