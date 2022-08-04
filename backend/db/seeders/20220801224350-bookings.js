'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookings", [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('08-01-2022'),
        endDate: new Date('08-03-2022'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('08-04-2022'),
        endDate: new Date('08-06-2022'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('08-07-2022'),
        endDate: new Date('08-09-2022'),
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date('08-10-2022'),
        endDate: new Date('08-12-2022'),
      },
      {
        spotId: 5,
        userId: 5,
        startDate: new Date('08-13-2022'),
        endDate: new Date('08-15-2022'),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
