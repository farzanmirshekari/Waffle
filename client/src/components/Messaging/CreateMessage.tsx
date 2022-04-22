import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../validators/authentication_verifier";

function CreateMessage() {

    const navigate = useNavigate();

    useEffect(() => {
        const verify_authentication = async () => {
            try {
                const authentication_verified = await authentication_verifier();
                if ( !authentication_verified ) { navigate('/sign_in'); }
            } catch ( error ) {
                navigate('/sign_in');
            }
        }
        verify_authentication();
    }, [navigate])

    return (

        <div className = 'full_page absolute w-full h-full flex flex-col justify-start items-center'>

        </div>

    )

}

export default CreateMessage;