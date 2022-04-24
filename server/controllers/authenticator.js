const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validator } = require('../helpers/validator');
const { create_token } = require('../utilities/token_creator');

exports.sign_up = ( req, res ) => {

    const { name, username, password, birthdate, profile_photo } = req.body;

    const validation_results = validator(name, username, password, birthdate, profile_photo);

    if (validation_results.length > 0) { return res.status(422).json( { errors: validation_results } ); }

    User.findOne({ username: username })
        .then(( user ) => {
            if ( user ) { return res.status(422).json( { errors: [{ user: "Username already taken."}] } ); }
            else {
                
                const user = new User({

                    name: name,
                    username: username,
                    password: password,
                    birthdate: birthdate,
                    profile_photo: profile_photo

                })

                bcrypt.genSalt(10, ( error, salt ) => {
                    bcrypt.hash(password, salt, ( error, hash ) => {
                        if (error) throw error;
                        user.password = hash;
                        user.save()
                            .then(( response ) => {
                                res.status(200).json({

                                    success: true,
                                    result: response

                                })
                            })
                    })
                })
            }
        })
        .catch(( error ) => {
            res.status(500).json({
                errors: [{ error: error }]
            });
        })

}

exports.sign_in = ( req, res ) => {

    const { username, password } = req.body;

    User.findOne( { username: username } ) 
        .then(( user ) => {

            if ( !user ) { return res.status(404).json( { errors: [{ user: "Not Found." }] } ); }

            else {
                bcrypt.compare(password, user.password)
                    .then(( is_match ) => {

                        if ( !is_match ) { return res.status(400).json( { errors: [{ password: "Incorrect" }] } ); }

                        const access_token = create_token( user.username, user._id, 3600 );

                        jwt.verify(access_token, process.env.TOKEN_SECRET, ( error, decoded ) => {
                            if ( error ) { res.status(500).json( { errors: error } ); }
                            if ( decoded ) {
                                return res.status(200).json( {
                                    success: true,
                                    token: access_token,
                                    message: user
                                } );
                            }

                        });

                    })
                    .catch(( error ) => {
                        res.status(500).json( { errors: error } );
                    });
            }
        })
        .catch( (error) => {
            res.status(500).json( { errors: error } );
        } );

}

exports.token_validator = ( req, res ) => {

    const { token } = req.body;

    jwt.verify(token, process.env.TOKEN_SECRET, ( error, decoded ) => {
        if ( error ) { res.json( { verified: false } ); }
        if ( decoded ) {
            User.findOne({ username: decoded.username })
                .then(( user ) => {
                    res.status(200).json( { verified: true, user: user } )
                })
        }
    })

}