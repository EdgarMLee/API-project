'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: '5500 Soto St.',
        city: 'Topanga',
        state: 'California',
        country: 'United States',
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
        country: 'United States',
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
        country: 'United States',
        lat: 7.165165,
        lng: 1.325166,
        name: 'Hillcrest',
        description: 'Palms soar over a pool and sculpture garden, and skaters can ollie on the tennis court\'s built-in ramp.',
        price: 1495
      },
      {
        ownerId: 5,
        address: '1854 Pete Dr.',
        city: 'Montecito',
        state: 'California',
        country: 'United States',
        lat: 3.416165,
        lng: 4.152489,
        name: 'Sand Dollar Retreat - Classic Montecito Craftsman',
        description: 'Coveted beachside community surrounded by manicured gardens with tall hedges to maximize your privacy and relaxation.',
        price: 155
      },
      {
        ownerId: 1,
        address: '4686 Warwick',
        city: 'Hildale',
        state: 'Utah',
        country: 'United States',
        lat: 3.166165,
        lng: 5.325166,
        name: 'Zion EcoCabin : Zion A-Frame',
        description: 'Soak up the sun and unwind in the Zion A-Frame. The unique convertible door lets the indoor comforts of this cozy cabin blend seamlessly with the stunning nature of the South Zion Mountains. The A-Frame living space is expansive - an open air concept to reconnect human and nature, allowing you to enjoy the natural world around you.',
        price: 783
      },
      {
        ownerId: 2,
        address: '6384 Avalon',
        city: 'Westcliffe',
        state: 'Colorado',
        country: 'United States',
        lat: 4.534123,
        lng: 7.656166,
        name: 'Modern ranch cabin at the base of the mountains!',
        description: 'Modern ranch style cabin on 160 acre property with incredible large mountain views all around.  House was designed by an architect and shows in every detail and the gorgeous furnishings throughout the inside and exterior of the home.  Large screened porch to enjoy the incredible mountain views for hours on end.',
        price: 500
      },
      {
        ownerId: 3,
        address: '6871 Bungalo',
        city: 'Gypsum',
        state: 'Colorado',
        country: 'United States',
        lat: 6.136846,
        lng: 3.731873,
        name: 'Picturesque Lodge, Seventy A. Bordering Flat Top Wilderness.',
        description: 'Escape it all in this one if kind handcrafted custom log home. This work of art is tucked away in the largest aspen grove in the Flat Tops National Forest at 9200 feet. You will relax in a rust-hued armchair in front of majestic gallery windows or on the front or back porches looking into the tranquil surrounding aspen forest while spotting deer, foxes, elk, bald eagles, and maybe the local moose. ',
        price: 338
      },
      {
        ownerId: 4,
        address: '9463 Coldridge',
        city: 'Estes Park',
        state: 'Colorado',
        country: 'United States',
        lat: 3.136846,
        lng: 7.731873,
        name: 'SECLUDED CABIN ON 10 ACRES. BROOK, WILDLIFE, VIEWS',
        description: 'If you do, enjoy peace and tranquility on ten private acres in our secluded mountain hideaway. Our 1400 s/f sanctuary is in a magical forest with trees, views, wildlife, and a seasonal stream.',
        price: 256
      },
      {
        ownerId: 5,
        address: '3419 Santeville',
        city: 'Brian Head',
        state: 'Utah',
        country: 'United States',
        lat: 6.136846,
        lng: 3.731873,
        name: 'Exclusive cabin between Giant Steps and Navajo with wonderful home essentials',
        description: 'Perfect for a mountain-themed getaway, this exclusive Brian Head vacation home is located directly between the Giant Steps and Navajo lodges and just a short drive from the slopes!',
        price: 135
      },
      {
        ownerId: 1,
        address: '7615 Victsville',
        city: 'Jackson',
        state: 'Wyoming',
        country: 'United States',
        lat: 2.136846,
        lng: 8.731873,
        name: 'Abode at 7 Cabins | Perfect for Family & Group Retreats | One of a Kind Property',
        description: 'If you are looking for a place to frolic amongst wide open spaces and enjoy life outside, Abode at 7 Cabins is an incredible place to host a family reunion, a business retreat, or a gathering of old friends.',
        price: 1836
      },
      {
        ownerId: 2,
        address: '8713 Layman',
        city: 'Lake Arrowhead',
        state: 'California',
        country: 'United States',
        lat: 4.136846,
        lng: 6.731873,
        name: '"Oak Tree A-Frame", designed by @To_Dwell_Here',
        description: 'No expense was spared for this 100% remodeled cabin, designed by yours truly, @To_Dwell_Here.   Every beautiful detail was planned with you in mind, because our passion is creating places for inviting people!  Modern, Scandinavian, and mid-century inspired décor is as inviting and cozy as it is magazine worthy.',
        price: 450
      },
      {
        ownerId: 3,
        address: '4613 Abora',
        city: 'Trinidad',
        state: 'California',
        country: 'United States',
        lat: 3.136846,
        lng: 8.731873,
        name: 'Beautiful Ocean View Cabin and Hot Tub!',
        description: 'Relax on our lawn chairs and breathe fresh air as sea lions bark and waves crash on the rocks below. Whale watch from the picnic table or soak in the hot tub while taking in the amazing view. How about a glass of wine while the sunset paints the sky in vibrant colors?',
        price: 299
      },
      {
        ownerId: 4,
        address: '3584 Whale',
        city: 'Superior',
        state: 'Montana',
        country: 'United States',
        lat: 2.136846,
        lng: 5.731873,
        name: 'Mountain View Villa - Alpine Falls Ranch',
        description: 'Come enjoy the beauty, privacy and seclusion of Mountain View Villa at Alpine Falls Ranch, adjacent to the LoLo National Forest and steps away from the Clark Fork river. Ranch Manager and housekeeping on site, catering available upon request.  The ranch includes horse facilities, a riding arena, gym, theater and trap/skeet for entertaining or parties.',
        price: 2499
      },
      {
        ownerId: 5,
        address: '1546 Cove',
        city: 'Bullhead City',
        state: 'Arizona',
        country: 'United States',
        lat: 3.136846,
        lng: 6.731873,
        name: 'Spectacular Riverfront 8bd/7ba (2507) Sleeps 18 Private docks',
        description: 'Quite possibly the most spectacular home on The Colorado River! Gated entrance allures you to this estate.   Private Pool and spa, and built-in barbecue, private boat launch and dock.',
        price: 2499
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
