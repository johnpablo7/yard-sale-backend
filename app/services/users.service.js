const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    let limit = 5;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const { name, lastname, email } = data;
    const newUser = {
      id: faker.datatype.uuid(),
      name,
      lastname,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 5000);
    });
  }

  async findOne(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
          reject(boom.notFound('User not found'));
        } else if (user.isBlock) {
          reject(boom.conflict('User is Block'));
        }

        resolve(user);
      }, 2000);
    });
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('User is Block');
    }
    const user = this.users[index];
    if (user.isBlock) {
      throw boom.conflict('User is Block');
    }
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
