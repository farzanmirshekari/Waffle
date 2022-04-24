function birthdate_formatter( birthdate : Date ) {

    return `${birthdate.getFullYear()}-${birthdate.getMonth()}-${birthdate.getDay()}`;
    
}

export default birthdate_formatter;