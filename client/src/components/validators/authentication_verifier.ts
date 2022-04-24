import axios from "axios";

async function authentication_verifier() {

    if( !localStorage.getItem('token') ) { return false; }

    const response = await axios.post('http://localhost:3001/validate_token', { token: localStorage.getItem('token') });
    
    console.log(response);

    return response.data;
    
}

export default authentication_verifier;