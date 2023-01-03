const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
});

router.get('/especial', (req, res) => {
  const products = [];

  for (let i = 0; i < 10; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      imageUrl: faker.image.imageUrl(),
      image: faker.image.cats(),
      datatype: faker.datatype.json(),
    });
  }

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Esto es un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created product',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update product',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete product',
    id,
  });
});

module.exports = router;
