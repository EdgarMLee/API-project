'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        review:'Good',
        stars: 4,
        userId: 3,
        spotId: 2,
      },
      {
        review:'Bad',
        stars: 2,
        userId: 2,
        spotId: 3,
      },
      {
        review:'Ugly',
        stars: 1,
        userId: 4,
        spotId: 1,
      },
      {
        review:'Great',
        stars: 4,
        userId: 3,
        spotId: 5,
      },
      {
        review:'Awesome',
        stars: 5,
        userId: 4,
        spotId: 3,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
