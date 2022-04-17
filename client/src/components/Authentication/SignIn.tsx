import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import InputField from "../MicroComponents/InputField";
import AbstractArtwork from '../../assets/abstract_faces_artwork.jpg';

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
        localStorage.setItem('birthdate', response.data.message.birthdate);
        if ( response.data.success ) { navigate('/') }
    }

    return (

        <div className = 'sign_in_page relative w-full h-full overflow-y-hidden flex flex-row justify-center items-center'>
            <div className = 'sign_in_container relative w-4/6 h-4/6 flex flex-row justify-center items-center -translate-y-12'>
                <div className = 'relative w-1/2 h-full justify-center items-center flex flex-col mt-3'>
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
                    <button className = 'auth_button bold rounded-md text-white mt-4' onClick={attempt_sign_in}>Sign In</button>
                </div>
                <div className = 'relative w-1/2 h-full flex justify-center items-center'>
                    <img src = {AbstractArtwork} className = 'relative w-full h-full' style = {{ borderTopRightRadius: `${10}px`, borderBottomRightRadius: `${10}px` }} alt = 'Login Artwork'/>
                </div>
            </div>
        </div>

    )

}

export default SignIn;