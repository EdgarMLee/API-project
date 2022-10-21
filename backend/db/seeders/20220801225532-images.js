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
    spotId: 4,
    reviewId: 5,
    userId: 4
  },
  {
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51108720/original/12d9a012-87ef-4fb5-bc5a-a5ceeb6c1762.jpeg?im_w=1200',
    previewImage: true,
    spotId: 6,
    reviewId: 6,
    userId: 1
  },
  {
    url: 'https://a0.muscache.com/im/pictures/a017859a-f4b8-499b-b871-f830b6053ad6.jpg?im_w=1200',
    previewImage: true,
    spotId: 7,
    reviewId: 7,
    userId: 2
  },
  {
    url: 'https://a0.muscache.com/im/pictures/monet/Select-25351222/original/54c85cc9-173b-4e9a-9167-c54137d90b1f?im_w=1200',
    previewImage: true,
    spotId: 8,
    reviewId: 8,
    userId: 3
  },
  {
    url: 'https://a0.muscache.com/im/pictures/9bc00af5-19de-4a8d-a9eb-a0d5cc74f649.jpg?im_w=1200',
    previewImage: true,
    spotId: 9,
    reviewId: 9,
    userId: 4
  },
  {
    url: 'https://a0.muscache.com/im/pictures/08d90bfc-10ff-4233-bf0b-1b6a6c66f24e.jpg?im_w=1200',
    previewImage: true,
    spotId: 10,
    reviewId: 10,
    userId: 5
  },
  {
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-41985648/original/2e253565-912d-4658-9b0e-8632d3d92fcb.jpeg?im_w=1200',
    previewImage: true,
    spotId: 11,
    reviewId: 11,
    userId: 1
  },
  {
    url: 'https://a0.muscache.com/im/pictures/52c83c5e-88b8-4d81-adda-81dd9907417f.jpg?im_w=1200',
    previewImage: true,
    spotId: 12,
    reviewId: 12,
    userId: 2
  },
  {
    url: 'https://a0.muscache.com/im/pictures/4f236baa-0eff-4de9-a3cc-cc84a06729cd.jpg?im_w=1200',
    previewImage: true,
    spotId: 13,
    reviewId: 13,
    userId: 3
  },
  {
    url: 'https://a0.muscache.com/im/pictures/2bfa9fd4-08cc-4014-b7ec-898f80a24525.jpg?im_w=1200',
    previewImage: true,
    spotId: 14,
    reviewId:14,
    userId: 4
  },
  {
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=1200',
    previewImage: true,
    spotId: 15,
    reviewId:15,
    userId: 5
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
