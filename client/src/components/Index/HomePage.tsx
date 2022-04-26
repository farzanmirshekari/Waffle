import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../validators/authentication_verifier";
import Message from "../Messaging/Message";

function HomePage() {

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

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const get_messages = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/get_messages', { token: token });
            setMessages(response.data.data);
        }
        get_messages()
    }, [])

    return (

        <div className = 'full_page overflow-y-auto absolute w-full h-full flex flex-col justify-start items-center'>
            <div className = 'relative w-full h-auto flex flex-col justify-start items-center mt-8 mb-1'>
                {
                    messages.length > 0 && (
                        messages.map((message, index) => {
                            return (
                                <Message 
                                    _id = {message._id}
                                    key = {index}
                                    author = {message.author.username}
                                    author_image = {message.author.profile_photo}
                                    content = {message.content}
                                    title = {message.title}
                                />
                            )
                        })
                    )
                }
            </div>
        </div>

    )

}

export default HomePage;