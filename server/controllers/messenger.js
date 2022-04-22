const Message = require('../models/message_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const { age_calculator } = require('../helpers/age_restrictor');

exports.create_message = ( req, res ) => {

    const { user, title, content, min_age, max_age } = req.body;

    User.findOne({ username: user })
        .then(( user ) => {
            const _message = new Message({

                author: user,
                title: title,
                content: content,
                min_age: min_age,
                max_age: max_age
        
            })
            _message.save()
                .then(( response ) => {
                    console.log(response);
                    res.status(200).json({

                        success: true,
                        result: response

                    })
                })
                .catch(( error ) => {
                    res.status(500).json({
                        errors: [{ error: error }]
                    })
                })
                })
}

exports.get_messages = ( req, res ) => {

    const { token } = req.body;

    jwt.verify(token, process.env.TOKEN_SECRET, ( error, decoded ) => {
        if ( error ) { res.status(500).json( { errors: error } ); }
        if ( decoded ) {         
            console.log(decoded);
            User.findOne({ username: decoded.username })
                .then(( user ) => {
                    console.log(user);
                    const user_age = age_calculator(user.birthdate);
                    Message.find( { min_age: {$lte: user_age}, max_age: {$gte: user_age} }, ( error, messages ) => {
 
                        if ( !error ) res.json( { data: messages } )
                        else { res.status(500).json( { errors: error } ) }
                
                    })
                })
                .catch(( error ) => {
                    res.status(500).json({
                        errors: [{ error: error }]
                    });
                })
        }
    })

}