const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message_schema = new Schema({

    user: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    min_age: { type: Number, required: true },
    max_age: { type: Number, required: true }

}, {
    collection: 'waffle_messages'
})

module.exports = mongoose.model('Message', message_schema);