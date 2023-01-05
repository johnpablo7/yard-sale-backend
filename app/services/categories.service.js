const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        categorie: faker.commerce.productAdjective(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const { categorie } = data;
    const newCategorie = {
      id: faker.datatype.uuid(),
      categorie,
    };
    this.categories.push(newCategorie);
    return newCategorie;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 3000);
    });
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = this.categories.find((item) => item.id === id);
        if (!category) {
          reject(boom.notFound('Category not found'));
        }

        resolve(category);
      }, 2000);
    });
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category is Block');
    }
    const category = this.categories[index];
    if (category.isBlock) {
      throw boom.conflict('Category is Block');
    }
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
