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

    const get_messages = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/get_messages', { token: token });
        setMessages(response.data);
    }

    return (

        <div className = 'home_page absolute w-full h-full flex flex-col justify-start items-center'>
            <button onClick={get_messages}>HELLO</button>
            <Message
            title="Hello"
            content="uahdyadawdawdadwd"
            author=""
            />
        </div>

    )

}

export default HomePage;