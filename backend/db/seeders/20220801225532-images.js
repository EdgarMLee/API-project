'use strict';

const images = [
  {
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48014396/original/f0dc413c-75ee-4fee-a5c0-03bd1d691a80.jpeg?im_w=1200',
    previewImage: true,
    spotId: 2,
    reviewId: 1,
    userId: 3
  },
  {
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-50490795/original/0341de12-9020-4b1a-9418-d55aeeba879c.jpeg?im_w=1200',
    previewImage: true,
    spotId: 3,
    reviewId: 2,
    userId: 2
  },
  {
    url: 'https://a0.muscache.com/im/pictures/45680811/f4987a12_original.jpg?im_w=1200',
    previewImage: true,
    spotId: 1,
    reviewId: 3,
    userId: 4
  },
  {
    url: 'https://a0.muscache.com/im/pictures/74ed19bf-b2bd-40f5-8c98-b8eb8edfe438.jpg?im_w=1200',
    previewImage: true,
    spotId: 5,
    reviewId: 4,
    userId: 3
  },
  {
    url: 'https://a0.muscache.com/im/pictures/3ea83d79-0f60-4abd-beda-bc7bd1a8f80c.jpg?im_w=1200',
    previewImage: true,
    spotId: 3,
    reviewId: 5,
    userId: 4
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", images)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', images)
  }
};
