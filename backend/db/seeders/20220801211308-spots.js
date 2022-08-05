'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: '5500 Soto St.',
        city: 'Topanga',
        state: 'California',
        country: 'USA',
        lat: 3.145654,
        lng: 5.145465,
        name: 'Modern treehouse in the heart of Topanga canyon',
        description: 'The house sits beautifully in the canyon in harmony with its surroundings.',
        price: 785
      },
      {
        ownerId: 2,
        address: '1250 Mongrove Ave',
        city: 'San Blas',
        state: 'Nayarit',
        country: 'Mexico',
        lat: 3.125168,
        lng: 5.161981,
        name: 'Chimera Private Island in San Blas only adults',
        description: 'Enjoy Chimera Island with its 4 infinity pools with ocean views',
        price: 199
      },
      {
        ownerId: 3,
        address: '1506 Prower',
        city: 'Yucca Valley',
        state: 'California',
        country: 'USA',
        lat: 4.154213,
        lng: 1.545015,
        name: 'Modern Airstream with Amazing Views',
        description: 'Combines both style and comfort in a very unique setting.',
        price: 100
      },
      {
        ownerId: 4,
        address: '6741 Burgette',
        city: 'Beverly Hills',
        state: 'California',
        country: 'USA',
        lat: 7.165165,
        lng: 1.325166,
        name: 'Hillcrest',
        description: 'Palms soar over a pool and sculpture garden, and skaters can ollie on the tennis court\'s built-in ramp.',
        price: 14950
      },
      {
        ownerId: 5,
        address: '1854 Pete Dr.',
        city: 'Montecito',
        state: 'California',
        country: 'USA',
        lat: 3.416165,
        lng: 4.152489,
        name: 'Sand Dollar Retreat - Classic Montecito Craftsman',
        description: 'Coveted beachside community surrounded by manicured gardens with tall hedges to maximize your privacy and relaxation.',
        price: 1556
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
