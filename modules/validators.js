const { body } = require('express-validator');

exports.signupValidator = [
  body('username').exists().isString().isLength({ min: 4 }).bail(),
  body('password').exists().isString().isLength({ min: 4 }).bail(),
  body('confirmPassword').exists().isString()
    .custom((value, { req }) => value === req.body.password)
];