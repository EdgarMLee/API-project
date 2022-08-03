const { requireAuth, restoreUser, setTokenCookie } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { Spot, Image, User, Review } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');

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


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, restoreUser, async (req, res, next) => {
  const url = req.body.url;
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId)
  if (!review) {
    const err = new Error('Review couldn\'t be found')
    err.status = 404
    return next(err)
  }
  const images = await Image.findAll({
    where: {spotId: review.spotId}
  })
  if (images.length >= 10) {
    const err = new Error('Maximum number of images for this resource was reached')
    err.status = 403
    return next(err)
  }
  const newImage = await Image.create({
    url,
    userId,
    spotId: review.spotId,
    reviewId
  })
  res.json({
    id: newImage.id,
    imageableId: newImage.spotId,
    url: newImage.url,
  });
});

//Edit a Review
router.put('/:reviewId', validateReview, requireAuth, restoreUser, async (req, res, next) => {
  const { review, stars } = req.body;
  const reviewId = req.params.reviewId;
  const reviewed = await Review.findByPk(reviewId);
  if (!reviewed) {
    const err = new Error('Review couldn\'t be found')
    err.status = 404
    return next(err)
  }
  const editReview = await reviewed.update({
    review,
    stars
  });
  res.json(editReview);
});

//Delete a Review
router.delete('/:reviewId', requireAuth, restoreUser, async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const reviewed = await Review.findByPk(reviewId);
  if (!reviewed) {
    const err = new Error('Review couldn\'t be found')
    err.status = 404
    return next(err)
  }
})

module.exports = router;
