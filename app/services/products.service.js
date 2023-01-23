const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
          reject(boom.notFound('Product not found'));
        } else if (product.isBlock) {
          reject(boom.conflict('Product is Block'));
        }
        resolve(product);
      }, 2000);
    });
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    if (product.isBlock) {
      throw boom.conflict('Product is Block');
    }
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found to delete');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
