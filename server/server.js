const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const database_connection = require('./database/connection');

const port = process.env.PORT || 3001;

mongoose.connect(process.env.ATLAS_URL)
    .then(() => {
        console.log('Connected to Mongoose!');
    })

app.use(cors());
app.use(express.json());
app.use(require('./routes/routes_handler'));

app.listen(port, () => {
    database_connection.connect_to_server(( error ) => {
        if ( error ) console.error(error);
    })
})