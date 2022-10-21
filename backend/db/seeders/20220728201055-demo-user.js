'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Peter',
        lastName: 'Parker',
        email: 'user1@user.io',
        username: 'PeterParker',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'user2@user.io',
        username: 'JohnSmith',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Jay',
        lastName: 'Park',
        email: 'user3@user.io',
        username: 'JayPark',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Jeon',
        lastName: 'Somi',
        email: 'user4@user.io',
        username: 'JeonSomi',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3','FakeUser4'] }
    }, {});
  }
};
