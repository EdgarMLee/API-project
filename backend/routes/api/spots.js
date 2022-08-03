const { requireAuth, restoreUser } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, User, Review, Booking } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

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
  const id = req.params.spotId;
  const review = await Review.findAll({
    where: {spotId: id }
  })
  res.json(review)
})

module.exports = router;
