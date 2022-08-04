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

//Edit a Booking
router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const todayDate = new Date();
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    const err = new Error("Booking couldn't be found")
    err.status = 404
    return next(err)
  }
  if (booking.endDate < todayDate) {
    const err = new Error("Past bookings can't be modified")
    err.status = 403
    return next(err)
  }
  // Check if bookings start/end dates interfere with each other
  const checkBooking = await Booking.findAll({
    where: {
      // bookingId,
      [Op.and]:
      [{startDate: {[Op.lte]: endDate}},
      {endDate: {[Op.gte]: startDate}}]
    }
  })
  //If so, return error message
  if (checkBooking.length) {
    const err = new Error("Sorry, this spot is already booked for the specified dates")
    err.status = 403
    err.errors = [{"startDate": "Start date conflicts with an existing booking",
    "endDate": "End date conflicts with an existing booking"}]
    return next(err)
  }
  const editBook = await booking.update({
    startDate,
    endDate
  })
  res.json(editBook);
  });

  //Delete a Booking
  router.delete('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booked = await Booking.findByPk(bookingId);
    if (!booked) {
      const err = new Error("Booking couldn't be found")
      err.status = 404
      return next(err)
    }
    await booked.destroy();
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  });

module.exports = router;
