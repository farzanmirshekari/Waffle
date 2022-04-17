import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../../validators/authentication_verifier";

function HomePage() {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if ( !authentication_verifier() ) { navigate('/sign_in'); }
    }, [navigate])

    const get_messages = async () => {
        const response = await axios.post('http://localhost:3001/get_messages', { token: localStorage.getItem('token') });
        setMessages(response.data);
    }

    return (

        <div className = 'home_page absolute w-full h-full'>

        </div>

    )

}

export default HomePage;