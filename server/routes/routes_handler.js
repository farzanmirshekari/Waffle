const express = require('express');

const { sign_up, sign_in } = require('../controllers/authenticator');
const { create_message, get_messages } = require('../controllers/messenger');

const router = express.Router();

const database_connection = require('../database/connection');

const object_id = require('mongodb').ObjectId;

router.route('/').get(( req, res ) => {
    res.send('Hello');
})

router.route('/sign_up').post(sign_up);
router.route('/sign_in').post(sign_in);

router.route('/create_message').post(create_message);
router.route('/get_messages').get(get_messages);

module.exports = router;