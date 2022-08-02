const { requireAuth, restoreUser } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, Owner } = require('../../db/models')

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
        model: Owner,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })
  if (!spotId) {
    res.status(404)
    res.json({
      "message": `Spot ID ${spotId} couldn't be found`,
      "statusCode": 404
    })
  }
  res.json(spot)
});

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
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

module.exports = router;
