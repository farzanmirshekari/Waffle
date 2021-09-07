const moment = require("moment");

const { 
  getHashedPasswordFor
} = require('./../modules/authenticator');

const { 
  getMessageForSignupUnsuccessful,
  getMessageDocumentFor,
  assignPermissionsTo,
  getUserDocumentFor,
  renderTemplate,
  messages, 
} = require('./../modules/helpers');

const db = require('./../models/db');

const passport = require('passport');

const { validationResult } = require('express-validator');

const passwords = {
  admin: process.env.adminPassword
}

exports.serveSignupView = (req, res, next) =>  {
  const populateWith = { title: 'Signup', signup: true };
  renderTemplate(res, 'signupOrLogin', populateWith);
}

exports.handleSignup = async (req, res, next) => {
  const validationErrors = validationResult(req).errors;
  if (validationErrors.length > 0){
    const message = getMessageForSignupUnsuccessful(validationErrors);
    const populateWith = { title: 'Signup Unsuccessful', message };
    return renderTemplate(res, 'signupUnsuccessful', populateWith);
  }

  const { username, password, birthdate } = req.body;
  birthdate.replace(/-/g, "");
  const userAge = moment().diff(moment(birthdate, "YYYYMMDD"), "years");
  const resultOne = await db.users.findOne({ username })
    .then(document => ({ document })).catch(error => ({ error }));
  if (resultOne.error) return next(resultOne.error);

  if (resultOne.document) {
    const populateWith = { title: 'Username Take' };
    return renderTemplate(res, 'usernameAlreadyTaken', populateWith);
  }

  const resultTwo = await getHashedPasswordFor(password)
    .then(hashedPassword => ({ hashedPassword }))
    .catch(error => ({ error }));
  if (resultTwo.error) return next(resultTwo.error);

  const hashed = resultTwo.hashedPassword;
  const userDocument = getUserDocumentFor(username, hashed, birthdate, userAge);
  
  const resultThree = await db.users.insertOne(userDocument)
    .catch(error => ({ error }));
  if (resultThree.error) return next(resultThree.error);

  res.redirect('/login');
}

exports.serveHomePageView = async (req, res, next) => {
  const result = await db.messages.find({ }).toArray()
    .then(documents => ({ documents })).catch(error => ({ error }));
  if (result.error) return next(result.error);

  const birthdate = req.user.birthdate;
  birthdate.replace(/-/g, "");
  const userAge = moment().diff(moment(birthdate, "YYYYMMDD"), "years");

  db.users.updateOne(
    {
       "username" : req.user.username
    },
    {
      $set: { "userAge" : userAge}
    }
  )

  const { documents } = result;
  const messages = assignPermissionsTo(documents, req.user);

  removeNullProperties(messages);

  console.log(messages);
  
  renderTemplate(res, 'index', { title: 'Index', messages }, false);
}

function removeNullProperties(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    let hasProperties = value && Object.keys(value).length > 0;
    if (value === null) {
      delete obj[key];
    }
    else if ((typeof value !== "string") && hasProperties) {
      removeNullProperties(value);
    }
  });
  return obj;
}

exports.serveBecomeMemberOrAdminView =  (req, res, next) => {
  const string = req.path.split('/').pop().split('-').pop();
  const become = string === 'member' ? 'Member' : 'Admin';

  const populateWith = { title: `Become ${become}`, become };
  renderTemplate(res, 'becomeMemberOrAdmin', populateWith);
}

exports.handleBecomeMemberOrAdmin = async (req, res, next) => {
  const string = req.path.split('/').pop().split('-').pop();
  const become = string === 'member' ? 'Member' : 'Admin';

  const { password } = req.body, { member, admin } = passwords;
  const correct = string === 'member' ? member : admin;

  if (password !== correct) {
    const populateWith = { title: `Become ${become}`, become, 
      message: messages.incorrectPassword };
    return renderTemplate(res, 'becomeMemberOrAdmin', populateWith);
  }

  const userKey = `is${become}`;
  req.user[userKey] = true;
  const filter = { username: req.user.username };
  const update = { $set: { [userKey]: true } };
  const result = await db.users.updateOne(filter, update)
    .catch(error => ({ error }));
  if (result.error) return next(result.error);
  
  res.redirect('/home');
}

exports.serveCreateMessageView = async (req, res, next) => {
  const populateWith = { title: 'Create Message' };
  renderTemplate(res, 'createMessage', populateWith);
}

exports.serveWrongCredentialsView = async (req, res, next) => {
  const populateWith = { title: 'Wrong Credentials' };
  renderTemplate(res, 'wrongCredentialsGiven', populateWith);
}

exports.handleCreateMessage = async (req, res, next) => {
  const { title, message, minAge, maxAge } = req.body, user = {};
  user.user = req.user.username;

  const document = getMessageDocumentFor(title, message, minAge, maxAge, user);
  const result = await db.messages.insertOne(document)
    .catch(error => ({ error }));
  if (result.error) return next(result.error);

  res.redirect('/');
}

exports.handleDeleteMessage = async (req, res, next) => {
  const { user, title, date, message } = req.body;
  const result = await db.messages.deleteOne({ user, title,
    date, message }).catch(error => ({ error }));

  return !result.error ? res.send({ error:null }) :
    res.status(500).send({ error: messages.serverErrorOccured });
}

exports.serveLoginView = (req, res, next) => {
  const populateWith = { title: 'Login', buttonName: 'Login' };
  renderTemplate(res, 'signupOrLogin', populateWith);
}

exports.handleLogin = passport.authenticate('local', { 
  successRedirect:'/', failureRedirect: '/wrong-credentials'
})

exports.handleLogout = (req, res, next) => {
  req.logout(); res.redirect('/');
}