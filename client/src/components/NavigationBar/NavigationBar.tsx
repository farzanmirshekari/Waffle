import { Link } from 'react-router-dom';
import navigation_bar_data from './navigation_bar_data';

function NavigationBar() {

    return (

        <div className = 'navigation_bar sticky z-1 w-full h-14 flex flex-row justify-start items-center'>

            <Link to = '/'>
                <h1 className = 'waffle_header text-white bold text-4xl ml-4 -mt-1'><p>waffle</p></h1>
            </Link>

            <ul className = 'relative flex flex-row w-full h-full ml-7 text-white text-lg gap-6 justify-start items-center'>
            {
                navigation_bar_data.map(( item ) => {
                    return <li className = 'navigation_bar_item' key={ item.index }><Link to = {item.path}>{item.label}</Link></li>
                })
            }
            </ul>
            
        </div>
        
    )

}

export default NavigationBar;