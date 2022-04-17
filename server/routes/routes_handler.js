const express = require('express');

const { sign_up, sign_in, token_validator } = require('../controllers/authenticator');
const { create_message, get_messages } = require('../controllers/messenger');

const router = express.Router();

router.route('/').get(( req, res ) => {
    res.send('Hello');
})

router.route('/sign_up').post(sign_up);
router.route('/sign_in').post(sign_in);

router.route('/validate_token').post(token_validator);

router.route('/create_message').post(create_message);
router.route('/get_messages').post(get_messages);

module.exports = router;