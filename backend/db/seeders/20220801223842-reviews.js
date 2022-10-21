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
      },
      {
        review:'We booked this place for two nights, and it was perfect. It has a breathtaking view, and the host quickly responded to whatever was needed. Thank you.',
        stars: 5,
        userId: 3,
        spotId: 6,
      },
      {
        review:'The perfect little getaway for a newlywed couple. Karen was great an accommodated every little request. Beautiful views and so relaxing. Perfect place to unwind.',
        stars: 4,
        userId: 5,
        spotId: 7,
      },
      {
        review:'This is one of the most amazing properties we have ever been to! The views, cabin, and trail were the perfect escape!',
        stars: 4,
        userId: 1,
        spotId: 8,
      },
      {
        review:'Excellent location and tucked away. Our host was very communicative before our trip and during. Our family enjoyed a lovely getaway here.',
        stars: 4,
        userId: 3,
        spotId: 9,
      },
      {
        review:'Spacious rental a short distance from the resort. Property description is accurate. Cable TV is available as is a blue ray player. Bring your own titles.',
        stars: 5,
        userId: 2,
        spotId: 10,
      },
      {
        review:'Professional, courteous, polite, amazing, incredible, Very well kept. The homes and grounds are way above standard.',
        stars: 5,
        userId: 4,
        spotId: 11,
      },
      {
        review:'The A-frame house was the perfect location for our weekend! We were looking for a place that was dog friendly, kid friendly, and had enough bedrooms for our group.',
        stars: 5,
        userId: 3,
        spotId: 12,
      },
      {
        review:'This airbnb is amazing. The house, the property, the view is Is exceptional.',
        stars: 5,
        userId: 1,
        spotId: 13,
      },
      {
        review:'This place is magical! It is a haven that we were so impressed with. We were here for Christmas and we couldn’t have asked for a better location.',
        stars: 5,
        userId: 2,
        spotId: 14,
      },
      {
        review:'A bit pricey but well worth it mansion!',
        stars: 5,
        userId: 2,
        spotId: 15,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
