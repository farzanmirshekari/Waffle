const mongoClient = require('mongodb').MongoClient;

require("dotenv").config();

const collectionNames = [ 'messages', 'users' ];
const databaseName = 'WaffleDB';
const connectionString = process.env.connection;

exports.makeConnection = async () => {
  const options = { useUnifiedTopology: true };
  const result = await mongoClient.connect(connectionString, options)
    .then(client => ({ error: null, data: client }))
    .catch(error => ({ error, data: null }));
  if (result.error) throw result.error;
  this.client = result.data;
  const db = result.data.db(databaseName);
  this.messages = db.collection(collectionNames[0]);
  this.users = db.collection(collectionNames[1]);
  console.log("Connection to MongoDB successful!");
}

exports.messages = undefined;
exports.client = undefined;
exports.users = undefined;