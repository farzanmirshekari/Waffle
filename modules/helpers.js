const db = require("../models/db");

const assignPermissionTo = (document, user) => {
  if (!user) { 
    document = null;
    return document;
  }
  else {
    if (user.isAdmin || document.user === user.username) {
      document.canBeDeleted = true;
    }
    const age = user.userAge;
    const documentMinAge = document.minAge;
    const documentMaxAge = document.maxAge;
    if((parseInt(documentMinAge) > age ||  age > parseInt(documentMaxAge)) && user.username !== document.user) {
        document = null;
        return document;
      }
    return document;
    }
}

const getDateForMessage = () => {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time; 
  return dateTime;
}

exports.assignPermissionsTo = (messages, user) => 
  messages.map(document => assignPermissionTo(document, user));

exports.getUserDocumentFor = (username, hashedPassword, birthdate, userAge) => ({
  password: hashedPassword, username, birthdate, userAge, isAdmin: false,
});

exports.getMessageDocumentFor = (title, message, minAge, maxAge, user) => ({
  title, message, minAge, maxAge, date: getDateForMessage(), ...user
});

exports.messages = {
  alreadyExists: 'A user with that username already exists!',
  incorrectPassword: 'The provided password is incorrect!',
  serverErrorOccured: 'Something went wrong :(',
  usernameLengthError: 'Username must be at least 4 characters long!',
  passwordLengthError: 'Password must be at least 4 characters long!',
  passwordUnconfirmed: 'Passwords do not match, Try again!'
};

exports.getMessageForSignupUnsuccessful = validationErrors => {
  const { param } = validationErrors.shift();
  
  if (param === 'username') return this.messages.usernameLengthError;
  if (param === 'password') return this.messages.passwordLengthError;
  return this.messages.passwordUnconfirmed;
}

exports.renderTemplate = (res, template, data, onlyCSS = true) => {
  const resources = { stylesheet:`${template}` };
  if (!onlyCSS) resources.javascript = `${template}`;
  const populateWith = { ...resources, ...data };
  res.render(template, populateWith);
}

exports.catchUnauthenticatedRequest = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  const populateWith = { title: 'Unauthorized' };
  res.status(401);
  res.redirect("/login");
}

exports.catchAlreadyMemberOrAdminRequest = (req, res, next) => {
  const string = req.path.split('/').pop().split('-').pop();
  const become = string === 'member' ? 'Member' : 'Admin';

  const userKey = `is${become}`;
  if (!req.user[userKey]) return next();
  const populateWith = { title:`Already ${become}`, become };
  this.renderTemplate(res, 'alreadyMemberOrAdmin', populateWith);
}