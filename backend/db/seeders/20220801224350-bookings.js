'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookings", [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-08'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-08'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-08'),
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date('2023-11-01'),
        endDate: new Date('2023-11-08'),
      },
      {
        spotId: 5,
        userId: 5,
        startDate: new Date('2023-12-01'),
        endDate: new Date('2023-12-08'),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
