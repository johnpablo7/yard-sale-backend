const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  constructor() {}

  async create(data) {
    // const newOrder = await models.Order.create(data);
    // return newOrder;
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId,
      },
      include: ['user'],
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    // const dataOrder = {
    //   customerId: customer[0].id,
    // };
    const newOrder = await models.Order.create({ customerId: customer.id });
    return newOrder;
  }

  // OrderProduct
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(Number(id), {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
