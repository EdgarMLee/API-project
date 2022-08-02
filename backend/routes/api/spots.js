const { requireAuth, restoreUser } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, User } = require('../../db/models')
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
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId,{
    include: [
      {
        model: Image,
        attributes: ['id', 'url']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })
  if (!spotId) {
    res.status(404)
    res.json({
      "message": `Spot couldn't be found`,
      "statusCode": 404
    })
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
router.post('/:spotId/images', requireAuth, restoreUser, async (req, res) => {
  const spotIds = req.params.spotId;
  const userIds = req.user.id;
  const urls = req.body.url;
  const spot = await Spot.findByPk(spotIds)
  if (!spot) {
    res.status(404);
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
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

module.exports = router;
