const jwt = require('jsonwebtoken');

exports.create_token = ( username, user_id, duration ) => {

    const payload = {
        username,
        user_id,
        duration
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: duration
    });

};