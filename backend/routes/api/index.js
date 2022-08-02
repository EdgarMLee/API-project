const router = require('express').Router();
const sessionRouter = require('./session.js');
const { restoreUser } = require("../../utils/auth.js");
const userRouter = require('./user.js');
const bookingRouter = require('./booking.js')
const reviewRouter = require('./review.js')
const spotRouter = require('./spot.js')

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use('/user', userRouter);
router.use('/session', sessionRouter);
router.use(restoreUser);
router.use('/booking', bookingRouter);
router.use('/review', reviewRouter);
router.use('/spot', spotRouter);


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
