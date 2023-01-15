const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const { name, price, image } = data; // Tambien podria no ir esta linea y debajo del id poner => ...data
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    return rta.rows;

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 3000);
    // });
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
      // throw new Error('product not found');
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
