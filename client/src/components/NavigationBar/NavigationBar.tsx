import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import navigation_bar_data from './navigation_bar_data';

function NavigationBar() {

    const navigate = useNavigate();

    const sign_out = () => {
        localStorage.clear();
        navigate('/sign_in');
    }

    return (

        <div className = 'navigation_bar sticky z-1 w-full h-14 flex flex-row justify-start items-center'>

            <Link to = '/'>
                <h1 className = 'waffle_header text-white bold text-4xl ml-4 -mt-1'><p>waffle</p></h1>
            </Link>

            <ul className = 'relative flex flex-row w-full h-full ml-7 text-white text-lg gap-6 justify-start items-center'>
            {
                navigation_bar_data.map(( item ) => {
                    return <li className = 'navigation_bar_item' key= { item.index }><Link to = {item.path}>{item.label}</Link></li>
                })
            }
            </ul>

            {
                localStorage.getItem('token') && (
                    <ul className = 'relative w-full h-full flex justify-end items-center text-lg text-white mr-4'>
                        <li className = 'navigation_bar_item cursor-pointer' onClick = { sign_out }>Sign Out</li>
                    </ul>
                )
            }
            
        </div>
        
    )

}

export default NavigationBar;