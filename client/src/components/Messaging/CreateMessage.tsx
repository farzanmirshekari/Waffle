import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../MicroComponents/InputField';
import authentication_verifier from "../validators/authentication_verifier";
import AbstractArtwork from '../../assets/abstract_still_life_artwork.jpg';
import axios from 'axios';

function CreateMessage() {

    const navigate = useNavigate();

    useEffect(() => {
        const verify_authentication = async () => {
            try {
                const authentication_verified = await authentication_verifier();
                if ( !authentication_verified.verified ) { navigate('/sign_in'); }
            } catch ( error ) {
                navigate('/sign_in');
            }
        }
        verify_authentication();
    }, [navigate])

    interface Message {
        author: string,
        title: string,
        content: string,
        min_age: number,
        max_age: number
    }

    const [messageContents, setMessageContents] = useState<Message>({
        author: '',
        title: '',
        content: '',
        min_age: 10,
        max_age: 99
    })

    const handle_input_change = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setMessageContents((prev_contents) => ({
            ...prev_contents,
            [name] : value
        }));
    }

    const attempt_create_message = async () => {
        await axios.post('http://localhost:3001/create_message', {
            token: localStorage.getItem('token'),
            title: messageContents.title,
            content: messageContents.content,
            min_age: messageContents.min_age,
            max_age: messageContents.max_age
        })
    }


    return (

        <div className = 'create_message_page absolute w-full h-full flex flex-col justify-center items-center'>
            <div className = 'message_creation_container relative w-4/6 h-4/6 flex flex-row justify-center items-center -translate-y-12'>
                <div className = 'relative w-1/2 h-full justify-center items-center flex flex-col'>
                    <div className = 'relative w-8/12 h-full flex flex-col justify-center items-left -translate-y-1'>
                        <div className = 'auth_greetings relative w-full h-1/6 flex flex-col justify-start items-left translate-y-5'>
                            <span className = 'bold text-4xl'>Craft a message..</span>
                            <p className = 'text-2xl mt-1'>Let your creativity take flight..</p>
                        </div>
                        <div className = 'relative w-full flex flex-col justify-center items-center gap-2'>
                            <InputField
                                type = 'text'
                                id = 'message_title'
                                label = 'Title'
                                name = 'title'
                                value = {messageContents.title}
                                onChange = {handle_input_change}
                            />
                            <div className = 'relative w-full h-auto flex flex-col justify-center items-center -mt-3'>
                                <p className = 'relative input_field_label w-full h-auto ml-1'>Content</p>
                                <textarea
                                    id = 'message_content'
                                    className = 'input_field w-full flex justify-center items-center resize-none bold pl-2.5 pr-2.5 pt-1.5'
                                    rows = {8}
                                    placeholder = 'Content'
                                    name = 'content'
                                    value = {messageContents.content}
                                    onChange = {( e : React.ChangeEvent<HTMLTextAreaElement> ) => {
                                        setMessageContents((prev_contents) => ({
                                            ...prev_contents,
                                            content: e.target.value
                                        }))
                                    }}
                                >
                                </textarea>     
                            </div>   
                            <div className = 'relative w-full flex flex-row gap-5 -mt-1'>
                                <InputField
                                    type = 'number'
                                    id = 'message_min_age'
                                    label = 'Min. Age'
                                    name = 'min_age'
                                    value = {messageContents.min_age}
                                    onChange = {handle_input_change}
                                />
                                <InputField
                                    type = 'number'
                                    id = 'message_max_age'
                                    label = 'Max. Age'
                                    name = 'max_age'
                                    value = {messageContents.max_age}
                                    onChange = {handle_input_change}
                                />
                            </div>                   
                        </div>
                        <button className = 'auth_button w-full bold rounded-md text-white mt-2' onClick={attempt_create_message}>Publish</button>
                    </div>
                </div>
                <div className = 'relative w-1/2 h-full flex justify-center items-center'>
                    <img src = {AbstractArtwork} className = 'relative w-full h-full' style = {{ borderTopRightRadius: `${10}px`, borderBottomRightRadius: `${10}px` }} alt = 'Login Artwork'/>
                </div>
            </div>
        </div>

    )

}

export default CreateMessage;