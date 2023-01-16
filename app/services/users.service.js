// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
// const pool = require('../libs/postgres.pool');
// const getConnection = require('../libs/postgres');

class UsersService {
  constructor() {}
  // constructor() {
  //   this.users = [];
  //   this.generate();
  //   this.pool = pool;
  //   this.pool.on('error', (err) => console.log(err));
  // }

  // generate() {
  //   let limit = 5;
  //   for (let i = 0; i < limit; i++) {
  //     this.users.push({
  //       id: faker.datatype.uuid(),
  //       firstname: faker.name.firstName(),
  //       lastname: faker.name.lastName(),
  //       email: faker.internet.email(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
    // const { firstname, lastname, email } = data;
    // const newUser = {
    //   id: faker.datatype.uuid(),
    //   firstname,
    //   lastname,
    //   email,
    // };
    // this.users.push(newUser);
    // return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
    // const query = 'SELECT * FROM task';
    // const rta = await this.pool.query(query);
    // return rta.rows;

    // Esta es otra forma con client
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM task');
    // return rta.rows;

    // Esta fue la primera forma
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(this.users);
    //   }, 5000);
    // });
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const user = this.users.find((item) => item.id === id);
    //     if (!user) {
    //       reject(boom.notFound('User not found'));
    //     } else if (user.isBlock) {
    //       reject(boom.conflict('User is Block'));
    //     }

    //     resolve(user);
    //   }, 2000);
    // });
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
    // const index = this.users.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('User is Block');
    // }
    // const user = this.users[index];
    // if (user.isBlock) {
    //   throw boom.conflict('User is Block');
    // }
    // this.users[index] = {
    //   ...user,
    //   ...changes,
    // };
    // return this.users[index];
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
    // const index = this.users.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('User not found');
    // }
    // this.users.splice(index, 1);
    // return { id };
  }
}

module.exports = UsersService;
