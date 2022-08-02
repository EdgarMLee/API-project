const { requireAuth } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot } = require('../../db/models')

router.get('/', async (req, res) => {
  const spot = await Spot.findAll()
  res.json(spot)
})

router.get('/current', requireAuth, async (req, res) => {
  const spot = await Spot.findAll()
  res.json(spot)
})

module.exports = router;
