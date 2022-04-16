const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_schema = new Schema({

    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: String, required: true }

}, {
    collection: 'waffle_users'
})

module.exports = mongoose.model('User', user_schema);