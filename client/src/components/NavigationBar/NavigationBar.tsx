import React from 'react';
import WaffleLogo from './../../assets/waffle_logo.svg';
import navigation_bar_data from './navigation_bar_data';

function NavigationBar() {

    return (

        <div className = 'navigation_bar sticky z-10 w-full h-16 flex flex-row justify-start items-center'>

            <img src = {WaffleLogo} className = 'h-10 ml-5' alt = 'Waffle Logo'/>

            <ul className = 'flex flex-row ml-4 text-zinc-200 gap-4'>
            {
                navigation_bar_data.map(( item ) => {
                    return <li>{item.label}</li>
                })
            }
            </ul>
            
        </div>
        
    )

}

export default NavigationBar;