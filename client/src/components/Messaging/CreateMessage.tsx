import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../validators/authentication_verifier";
import AbstractArtwork from '../../assets/abstract_still_life_artwork.jpg';

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

        <div className = 'full_page absolute w-full h-full flex flex-col justify-center items-center'>
            <div className = 'message_creation_container relative w-4/6 h-4/6 flex flex-row justify-center items-center -translate-y-12'>
                <div className = 'relative w-1/2 h-full justify-center items-center flex flex-col'>
                    
                </div>
                <div className = 'relative w-1/2 h-full flex justify-center items-center'>
                    <img src = {AbstractArtwork} className = 'relative w-full h-full' style = {{ borderTopRightRadius: `${10}px`, borderBottomRightRadius: `${10}px` }} alt = 'Login Artwork'/>
                </div>
            </div>
        </div>

    )

}

export default CreateMessage;