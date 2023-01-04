const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    categories.push({
      categorie: faker.commerce.productAdjective(),
    });
  }

  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    categorie: faker.commerce.productAdjective(),
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created categorie',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update categorie',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete categorie',
    id,
  });
});

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;
