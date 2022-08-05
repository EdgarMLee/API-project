const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({checkFalsy:true})
    .notEmpty()
    .withMessage('Password is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
//Validate firstName and lastName
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required.'),
  handleValidationErrors
];

// Sign up
router.post( '/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
//Validate Username is not duplicate
    const validateUsername = await User.findOne({
      where: {username}
    })
    if (validateUsername) {
      const err = new Error('User already exists')
        err.status = 403
        err.errors = { username: "User with that username already exists" }
        return next(err)
    };
//Validate Email is not duplicate
    const validateEmail = await User.findOne({
      where: {email}
    })
    if (validateEmail) {
      const err = new Error('User already exists')
        err.status = 403
        err.errors = { username: "User with that email already exists" }
        return next(err)
    };
    const user = await User.signup({ firstName, lastName, email, username, password });
    const token = await setTokenCookie(res, user);
    const userData = user.toSafeObject()
    userData.token = token
    return res.json({
      userData
    });
  });

module.exports = router;
