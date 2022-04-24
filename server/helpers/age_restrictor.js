const moment = require('moment');

exports.age_calculator = ( birthdate ) => {
    return moment().diff(moment(birthdate, 'YYYY-MM-DD'), 'years');  
}