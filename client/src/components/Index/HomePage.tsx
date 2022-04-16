import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../../validators/authentication_verifier";

function HomePage() {

    const navigate = useNavigate();

    useEffect(() => {
        if ( !authentication_verifier() ) { navigate('/sign_in'); }
    }, [navigate])

    return (

        <div className = 'home_page absolute w-full h-full'>



        </div>

    )

}

export default HomePage;