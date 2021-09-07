const async = require('async');
const User = require("./models/userModel");
const Message = require("./models/messageModel");

const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const users = [];
const messages = [];