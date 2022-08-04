const { requireAuth, restoreUser } = require("../../utils/auth");
const express = require('express')
const router = express.Router();
const { Spot, Image, User, Review, Booking } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require("sequelize");

//Get all of the Current User's Bookings
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
  const user = req.user.id
  const allBooks = await Booking.findAll({
    include: {
      model: Spot,
    },
    where: {userId: user},
    attributes: ['id','userId','spotId','startDate','endDate']
  })
//Find image belonging to user
  const image = await Image.findOne({
    where: {userId: user}
  })
//Store image books in empty array belonging to user
  let storedBooks = [];
  for (let books of allBooks) {
    let book = books.toJSON();
    book.Spot.previewImage = image.dataValues.url;
    storedBooks.push(book)
  }
  res.json({"Bookings": storedBooks})
});

module.exports = router;
