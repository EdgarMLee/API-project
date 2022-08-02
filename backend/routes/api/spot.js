const { requireAuth } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot } = require('../../db/models')

//Get all Spots
router.get('/', async (req, res) => {
  const spot = await Spot.findAll()
  res.json(spot)
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const spot = await Spot.findAll()
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

//Create a Spot
// router.post('/', requireAuth, async (req, res) => {
//   const { address, city, state, country, lat, lng, name, description, price } = req.body;
//   const spot = await Spot.
// })

module.exports = router;
