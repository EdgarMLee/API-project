const { requireAuth, restoreUser } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, User, Review, Booking } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require("sequelize");

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({checkFalsy:true})
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

  const validateQuery = [
    check('page')
      .exists({ checkFalsy: true })
      .isInt({min:0, max:10})
      .default(0)
      .withMessage("Page must be greater than or equal to 0"),
    check('size')
      .exists({ checkFalsy: true })
      .isInt({min:0, max:20})
      .default(20)
      .withMessage("Size must be greater than or equal to 0"),
    check('maxLat')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    check('minLat')
      .exists({checkFalsy:true})
      .isDecimal()
      .withMessage("Minimum latitude is invalid"),
    check('minLng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage("Minimum longitude is invalid"),
    check('maxLng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage("Maximum longitude is invalid"),
    check('minPrice')
      .exists({ checkFalsy: true })
      .isDecimal({min:0})
      .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
      .exists({ checkFalsy: true })
      .isDecimal({min:0})
      .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
  ];

//Get all Spots
router.get('/', async (req, res) => {
  const spot = await Spot.findAll()
  res.json(spot)
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, restoreUser, async (req, res) => {
  const id = req.user.id
  const spot = await Spot.findAll({
    where: {ownerId: id}
  })
  res.json(spot)
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  const {spotId} = req.params
  const spot = await Spot.findByPk(spotId,{
    include: [
      {
        model: Image,
        attributes: ['userId', ['spotId', 'imageableId'], 'url']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })
  if (!spot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  res.json(spot)
});


// Create a Spot
router.post('/', validateSpot, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const id = req.user.id
  const spot = await Spot.create({
    ownerId: id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })
  res.status(201)
  res.json(spot)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, restoreUser, async (req, res, next) => {
  const spotIds = req.params.spotId;
  const userIds = req.user.id;
  const urls = req.body.url;
  const spot = await Spot.findByPk(spotIds)
  if (!spot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  const image = await Image.create({
    url: urls,
    spotId: spotIds,
    userId: userIds
  })
  res.json({
    id: image.id,
    imageableId: image.spotId,
    url: image.url
  })
})

//Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spotId = req.params.spotId;
  const editSpot = await Spot.findByPk(spotId)
  if (!editSpot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  // else if (editSpot.ownerId !== req.user.id) {
  //   const err = new Error('Forbidden')
  //   err.status = 403
  //   return next(err)
  // }
  else {
    editSpot.address = address;
    editSpot.city = city;
    editSpot.state = state;
    editSpot.country = country;
    editSpot.lat = lat;
    editSpot.lng = lng;
    editSpot.name = name;
    editSpot.description = description;
    editSpot.price = price;
    await editSpot.save();
  }
  return res.json(editSpot);
})

//DELETE A Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)
  if (!spot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  spot.destroy();
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
  const spotId = req.params.spotId;
  //CHECK if spot exists
  const checkSpot = await Spot.findByPk(spotId)
  if (!checkSpot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  const reviews = await Review.findAll({
    where: {spotId: spotId }
  })
  //Iterate each review by attributes
  for (let review of reviews) {
    const user = await review.getUser({
      attributes: ['id', 'firstName', 'lastName']
    });
    const image = await review.getImages({
      attributes: ['id', ['reviewId', 'imageableId'], 'url']
    });
  //Append each one and convert toJSON
    review.dataValues.User = user.toJSON();
    review.dataValues.Image = image
  }
  res.json({"Reviews": reviews})
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const id = req.user.id;
  // const user = await User.findByPk(id);
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  const existReview = await Review.findAll({
    where: {
      [Op.and]: [
        {userId: id}, {spotId}
      ],
    },
  })
  if (existReview.length >= 1) {
    const err = new Error('User already has a review for this spot')
    err.status = 403
    return next(err)
  };
  const { review, stars } = req.body;
  const newReview = await Review.create({
    review,
    stars,
    userId: id,
    spotId
  });
  res.json(newReview)
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const user = req.user.id;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error('Spot couldn\'t be found')
    err.status = 404
    return next(err)
  }
  if (spot.ownerId === user) {
    const ownerBooks = await Booking.findAll({
      include: {
        model: User,
      },
      where: {spotId}
    })
    res.json({"Bookings": ownerBooks})
  }
  else {
    const books = await Booking.findAll({
      attributes: ['spotId', 'startDate','endDate'],
      where: {spotId}
    })
    res.json({"Bookings": books})
  }
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const userId = req.user.id
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }
//Check if bookings start/end dates interfere with each other
  const checkBooking = await Booking.findAll({
    where: {
      spotId,
      [Op.and]:
      [{startDate: {[Op.lte]: endDate}},
      {endDate: {[Op.gte]: startDate}}]
    }
  })
  //If so, return error message
  if (checkBooking.length) {
    const err = new Error("Sorry, this spot is already booked for the specified dates")
    err.status = 403
    err.errors = [{"startDate": "Start date conflicts with an existing booking",
    "endDate": "End date conflicts with an existing booking"}]
    return next(err)
  }
  //Cant book your own spot
  else if (spot.ownerId === userId) {
    const err = new Error("Cannot book your own spot")
    err.status = 403
    return next(err)
  }
//Create new booking if not your own spot
else if (spot.ownerId !== userId) {
  const createBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  })
  res.json(createBooking);
}
});

//Add Query Filters to Get All Spots
router.get('/', validateQuery, async (req, res, next) => {
const { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;
let pagination = {check:[]}
if (maxLat) pagination.check.push({lat: {[Op.gte]: Number(maxLat)}});
if (minLat) pagination.check.push({lat: {[Op.gte]: Number(minLat)}});
if (maxLng) pagination.check.push({lat: {[Op.gte]: Number(maxLng)}});
if (minLng) pagination.check.push({lat: {[Op.gte]: Number(minLng)}});
if (maxPrice) pagination.check.push({lat: {[Op.gte]: Number(maxPrice)}});
if (minPrice) pagination.check.push({lat: {[Op.gte]: Number(minPrice)}});
  page = parseInt(page);
  size = parseInt(size);
  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;
const allSpots = await Spot.findAll({
  limit: size,
  offset: size * (page - 1)
})
res.json({
  "Spots": allSpots,
  "page": page,
  "size": size
})
});

module.exports = router;
