const Message = require('../models/message_model');

exports.create_message = ( req, res ) => {

    const { user, title, content, min_age, max_age } = req.body;

    const _message = new Message({

        user: user,
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

}

exports.get_messages = ( req, res ) => {

    Message.find(( error, messages ) => {

        if ( !error ) res.json( { data: messages } )
        else { res.status(500).json( { errors: error } ) }

    })

}