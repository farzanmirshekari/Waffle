import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import InputField from "../MicroComponents/InputField";
import AbstractArtwork from '../../assets/abstract_face_artwork.jpg';

function SignUp() {

    const navigate = useNavigate();

    const [profilePhoto, setProfilePhoto] = useState<File>(null);

    interface SignUpCredentials {
        name: string,
        birthdate: string,
        username: string,
        password: string,
        profile_photo: string;
    }

    const [ credentials, setCredentials ] = useState<SignUpCredentials>({
        name: '',
        birthdate: '',
        username: '',
        password: '',
        profile_photo: ''
    })

    const handle_input_change = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setCredentials((prev_credentials) => ({
            ...prev_credentials,
            [name] : value
        }));
    }

    const handle_profile_photo_upload = () => {
        const file_name = (new Date()).toISOString() + profilePhoto.name;
        const storage_ref = ref(storage, `/profile_photos/${file_name}`);
        uploadBytes(storage_ref, profilePhoto).then( async ( snapshot ) => {
            const download_url = await getDownloadURL(snapshot.ref);
            setCredentials((prev_state) => ({
                ...prev_state,
                profile_photo: download_url
            }))
        })
    }

    const attempt_sign_up = async () => {
        handle_profile_photo_upload();
        const sign_up_response = await axios.post('http://localhost:3001/sign_up', credentials);
        if ( sign_up_response.data.success ) { 
            const sign_in_response = await axios.post('http://localhost:3001/sign_in', {
                username: credentials.username,
                password: credentials.password
            })
            if ( sign_in_response.data.success ) {
                localStorage.setItem('token', sign_in_response.data.token);
                localStorage.setItem('birthdate', sign_in_response.data.message.birthdate);
                navigate('/');
            }
         }
    }

    return (

        <div className = 'sign_in_page relative w-full h-full overflow-y-hidden flex flex-row justify-center items-center'>
            <div className = 'sign_in_container relative w-4/6 h-4/6 flex flex-row justify-center items-center -translate-y-12'>
                <div className = 'relative w-1/2 h-full justify-center items-center flex flex-col'>
                    <div className = 'relative w-8/12 h-full flex flex-col justify-center items-left -translate-y-3'>
                        <div className = 'auth_greetings relative w-full h-1/6 flex flex-col justify-start items-left translate-y-2'>
                            <span className = 'bold text-4xl'>Welcome!</span>
                            <p className = 'text-2xl mt-1'>So glad you are here..</p>
                        </div>
                        <div className = 'relative w-full flex flex-row justify-center items-center gap-2'>
                            <InputField
                                type = 'text'
                                id = 'sign_up_name'
                                label = 'Full Name'
                                name = 'name'
                                value = {credentials.name}
                                onChange = {handle_input_change}
                            />
                            <InputField
                                type = 'date'
                                id = 'sign_up_birthdate'
                                label = 'Birthdate'
                                name = 'birthdate'
                                value = {credentials.birthdate}
                                onChange = {handle_input_change}
                            />
                        </div>
                        <InputField
                            type = 'text'
                            id = 'sign_up_username'
                            label = 'Username'
                            name = 'username'
                            value = {credentials.username}
                            onChange = {handle_input_change}
                        />
                        <InputField
                            type = 'password'
                            id = 'sign_up_password'
                            label = 'Password'
                            name = 'password'
                            value = {credentials.password}
                            onChange = {handle_input_change}
                        />
                        <input
                            type = 'file'
                            onChange = {( e : React.ChangeEvent<HTMLInputElement> ) => { setProfilePhoto(e.target.files[0]); }}
                        />
                        <button className = 'auth_button w-full bold rounded-md text-white' onClick={attempt_sign_up}>Sign Up</button>
                    </div>
                </div>
                <div className = 'relative w-1/2 h-full flex justify-center items-center'>
                    <img src = {AbstractArtwork} className = 'relative w-full h-full' style = {{ borderTopRightRadius: `${10}px`, borderBottomRightRadius: `${10}px` }} alt = 'Login Artwork'/>
                </div>
            </div>
        </div>

    )

}

export default SignUp;