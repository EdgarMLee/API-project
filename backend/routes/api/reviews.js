const { requireAuth, restoreUser, setTokenCookie } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, User, Review } = require('../../db/models')

//Get all Reviews of the Current User
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
const id = req.user.id;
const reviews = await Review.findAll({
  where: {userId: id}
})
//Iterate each review by attributes
for (let review of reviews) {
  const user = await review.getUser({
    attributes: ['id', 'firstName', 'lastName']
  });
  const spot = await review.getSpot()
  const image = await review.getImages({
    attributes: ['id', ['reviewId', 'imageableId'], 'url']
  });
//Append each one and convert toJSON
  review.dataValues.User = user.toJSON();
  review.dataValues.Spot = spot.toJSON();
  review.dataValues.Image = image
}
res.json({"Reviews": reviews})
})

module.exports = router;
