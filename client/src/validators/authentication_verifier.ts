function authentication_verifier() {

    return localStorage.getItem('token');
    
}

export default authentication_verifier;