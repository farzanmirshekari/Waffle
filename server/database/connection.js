const { MongoClient } = require('mongodb');

const database_connection_string = process.env.ATLAS_URL;

const client = new MongoClient(database_connection_string);

let _database;

module.exports = {
    
    connect_to_server: (callback) => {
        client.connect(( error, database ) => {

            if (database) {
                _database = database.db('waffle_database');
                console.log('Connection successful!');
            }
            return callback(error);
        });
    },

    get_database: () => {
        return _database;
    }

}