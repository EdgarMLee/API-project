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
res.json(review)
})

module.exports = router;
