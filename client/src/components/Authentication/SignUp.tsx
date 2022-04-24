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

    const handle_profile_photo_upload = async () => {
        const file_name = (new Date()).toISOString() + profilePhoto.name;
        const storage_ref = ref(storage, `/profile_photos/${file_name}`);
        let download_url =  uploadBytes(storage_ref, profilePhoto).then( async ( snapshot ) => {
                                download_url = await getDownloadURL(snapshot.ref);
                                setCredentials((prev_state) => ({
                                    ...prev_state,
                                    profile_photo: download_url
                                }))
                                return download_url;
                            })
        return download_url;
    }

    const attempt_sign_up = async () => {
        const uploaded_profile_photo_url = await handle_profile_photo_upload()
        const sign_up_response = await axios.post('http://localhost:3001/sign_up', {
            name: credentials.name,
            username: credentials.username,
            password: credentials.password,
            birthdate: credentials.birthdate,
            profile_photo: uploaded_profile_photo_url
        });
        if ( sign_up_response.data.success ) { 
            const sign_in_response = await axios.post('http://localhost:3001/sign_in', {
                username: credentials.username,
                password: credentials.password
            })
            if ( sign_in_response.data.success ) {
                localStorage.setItem('token', sign_in_response.data.token);
                localStorage.setItem('username', sign_in_response.data.message.username);
                localStorage.setItem('profile_photo', sign_in_response.data.message.profile_photo)
                navigate('/');
            }
         }
    }

    return (

        <div className = 'authentication_page relative w-full h-full overflow-y-hidden flex flex-row justify-center items-center'>
            <div className = 'authentication_container relative w-4/6 h-4/6 flex flex-row justify-center items-center -translate-y-12'>
                <div className = 'relative w-1/2 h-full justify-center items-center flex flex-col'>
                    <div className = 'relative w-8/12 h-full flex flex-col justify-center items-left'>
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
                        <div className = 'relative w-full flex flex-row justify-start gap-4'>
                            <div className = 'relative w-9/12 h-full justify-start items-center'>
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
                            </div>
                            <div className = 'relative w-5/12 h-full flex flex-col justify-center items-center'>
                                <div className = 'relative w-full h-auto -mt-1'>
                                    <p className = 'relative input_field_label w-full h-auto translate-y-3'>Profile Photo</p>
                                    <label className = 'file_upload_container flex justify-center items-center relative overflow-hidden rounded-md mt-4 bg-white p-2 -translate-y-1'>
                                        <p>Upload Image</p>
                                        <input
                                            className = 'absolute block cursor-pointer opacity-0 min-w-full min-h-full top-0 right-0 text-left text-9xl'
                                            type = 'file'
                                            onChange = {( e : React.ChangeEvent<HTMLInputElement> ) => { setProfilePhoto(e.target.files[0]); }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className = 'auth_button w-full bold rounded-md text-white mt-5' onClick={attempt_sign_up}>Sign Up</button>
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