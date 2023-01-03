const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.imageUrl(),
    });
  }

  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.query;

  res.json({
    id,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    image: faker.image.imageUrl(),
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created user',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update user',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete user',
    id,
  });
});

module.exports = router;
