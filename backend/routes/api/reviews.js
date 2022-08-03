const { requireAuth, restoreUser, setTokenCookie } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, User, Review } = require('../../db/models')

//Get all Reviews of the Current User
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
const id = req.user.id;
const review = await Review.findAll({
  where: {userId: id}
})
const user = await User.findAll({
  where: {id: review.userId}
})
const spot = await Spot.findAll({
  where: {id: review.spotId}
})
const image = await Image.findAll({
  where: {id: review.}
})
res.json(review)
})



module.exports = router;
