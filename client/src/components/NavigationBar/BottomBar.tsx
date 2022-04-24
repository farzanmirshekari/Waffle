import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authentication_verifier from "../validators/authentication_verifier";

function BottomBar() {

    const navigate = useNavigate();

    interface BottomBarData {
        username: string,
        profile_photo: string
    }

    const [ userNameAndPhoto, setUserNameAndPhoto ] = useState<BottomBarData>({
        username: '',
        profile_photo: ''
    })

    useEffect(() => {
        const verify_authentication = async () => {
            try {
                const authentication_verified = await authentication_verifier();
                if ( !authentication_verified.verified ) { navigate('/sign_in'); }
                setUserNameAndPhoto({
                    username: authentication_verified.user.username,
                    profile_photo: authentication_verified.user.profile_photo
                })
            } catch ( error ) {
                navigate('/sign_in');
            }
        }
        verify_authentication();
    }, [navigate])

    console.log(userNameAndPhoto);

    return (

        <div className = 'bottom_bar absolute z-1 h-14 w-full justify-start items-center'>
            {
                userNameAndPhoto.username && userNameAndPhoto.profile_photo && localStorage.getItem('token') && (
                    <div className = 'relative w-1/3 h-full flex flex-row justify-start items-center'>
                        <img src = {userNameAndPhoto.profile_photo} alt = 'User' className = 'relative w-12 h-12 rounded-full ml-2 object-cover' />
                        <p className = 'text-base text-justify text-white ml-2 tracking-wide' style = {{ fontFamily: 'Josefin Sans' }}>{userNameAndPhoto.username}</p>
                    </div>
               )
            }
        </div>

    )
}

export default BottomBar;