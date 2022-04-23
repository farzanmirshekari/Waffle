import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import InputField from "../MicroComponents/InputField";
import AbstractArtwork from '../../assets/abstract_faces_artwork.jpg';

function SignIn() {

    const navigate = useNavigate();

    interface SignInCredentials {
        username: string,
        password: string
    }

    const [ credentials, setCredentials ] = useState<SignInCredentials>({
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
        if ( response.data.success ) { 
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('birthdate', response.data.message.birthdate);
            navigate('/') 
        }
    }

    return (

        <div className = 'authentication_page relative w-full h-full overflow-y-hidden flex flex-row justify-center items-center'>
            <div className = 'authentication_container relative w-4/6 h-4/6 flex flex-row justify-center items-center -translate-y-12'>
                <div className = 'relative w-1/2 h-full justify-center items-center flex flex-col'>
                    <div className = 'relative w-8/12 h-full flex flex-col justify-center items-left translate-y-3'>
                        <div className = 'auth_greetings relative w-full h-1/6 flex flex-col justify-start items-left translate-y-2'>
                            <span className = 'bold text-4xl'>Welcome back!</span>
                            <p className = 'text-2xl mt-1'>You have been missed..</p>
                        </div>
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
                        <button className = 'auth_button w-full bold rounded-md text-white mt-5' onClick={attempt_sign_in}>Sign In</button>
                        <div className = 'auth_greetings relative w-full h-1/6 flex flex-col justify-start items-left mt-2 gap-1'>
                            <h5 className = 'mt-2'>No account?</h5>
                            <h5>No Worries!</h5>
                            <h5>Join <a href = '/sign_up' className = 'underline'>here</a>!</h5>
                        </div>
                    </div>
                </div>
                <div className = 'relative w-1/2 h-full flex justify-center items-center'>
                    <img src = {AbstractArtwork} className = 'relative w-full h-full' style = {{ borderTopRightRadius: `${10}px`, borderBottomRightRadius: `${10}px` }} alt = 'Login Artwork'/>
                </div>
            </div>
        </div>

    )

}

export default SignIn;