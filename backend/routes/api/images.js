const express = require('express')
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, User, Review, Booking } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require("sequelize");
const router = express.Router();

//Delete an Image
router.delete('/:imageId', requireAuth, restoreUser, async (req, res, next) => {
  const imageId = req.params.imageId;
  const image = await Image.findByPk(imageId);
  if (!image) {
    const err = new Error("Image couldn't be found")
    err.status = 404
    return next(err)
  }
  await image.destroy();
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
});

module.exports = router;
