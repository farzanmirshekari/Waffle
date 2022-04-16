exports.validator = ( name, username, password, birthdate ) => {

    let errors = [];

    if ( !birthdate || !(new Date(birthdate) instanceof Date && !isNaN(new Date(birthdate))) ) { errors.push({ Birthdate: "Invalid" }); }
    if ( !name || /\d/.test(name) ) { errors.push({ Name: "Invalid" }) }
    if ( !username || username.length > 16 ) { errors.push({ Username: "Invalid" }) }
    if ( !password || password.length < 8 ) { errors.push({ Password: "Invalid" }) }

    return errors;

}