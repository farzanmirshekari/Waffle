import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import InputField from "../MicroComponents/InputField";

function SignIn() {

    const navigate = useNavigate();

    interface Credentials {
        username: string,
        password: string
    }

    const [ credentials, setCredentials ] = useState<Credentials>({
        username: '',
        password: ''
    })

    const handle_input_change = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setCredentials((prev_credentials) => ({
            ...prev_credentials,
            [name] : value
        }));
    }

    const attempt_sign_in = async () => {
        const response = await axios.post('http://localhost:3001/sign_in', credentials);
        localStorage.setItem('token', response.data.token);
        if ( response.data.success ) { navigate('/') }
    }

    return (

        <div>
            <div>
                <InputField
                    type = 'text'
                    id = 'sign_in_username'
                    label = 'Username'
                    name = 'username'
                    value = {credentials.username}
                    onChange = {handle_input_change}
                />
                <InputField
                    type = 'password'
                    id = 'sign_in_password'
                    label = 'Password'
                    name = 'password'
                    value = {credentials.password}
                    onChange = {handle_input_change}
                />
                <button onClick={attempt_sign_in}>Submit</button>
            </div>
        </div>

    )

}

export default SignIn;