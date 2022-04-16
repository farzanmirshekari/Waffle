const express = require('express');
const { sign_up, sign_in } = require('../controllers/authenticator');

const router = express.Router();

const database_connection = require('../database/connection');

const object_id = require('mongodb').ObjectId;

router.route('/').get(( req, res ) => {
    res.send('Hello');
})

router.route('/sign_up').post(sign_up);
router.route('/sign_in').post(sign_in);

module.exports = router;