import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../validators/authentication_verifier";
import Message from "./Message";

function HomePage() {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const verify_authentication = async () => {
            const authentication_verified = await authentication_verifier();
            if ( !authentication_verified ) { navigate('/sign_in'); }
        }
        verify_authentication();
    }, [navigate])

    useEffect(() => {
        const get_messages = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/get_messages', { token: token });
            setMessages(response.data.data);
        }
        get_messages()
    }, [])

    return (

        <div className = 'home_page absolute w-full h-full flex flex-col justify-start items-center'>
            <div className = 'relative w-full h-full flex flex-col justify-start items-center mt-8'>
                {
                    messages.length > 0 && (
                        messages.map((message) => {
                            return (
                                <Message 
                                    author = {message.author.name}
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