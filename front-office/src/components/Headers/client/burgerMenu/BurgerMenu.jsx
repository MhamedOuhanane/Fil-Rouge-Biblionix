import React, { useState } from 'react';
import ButtonBurgerMenu from './ButtonBurgerMenu';
import Navigation from '../Navigation';

const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const overflowBody = () => {
        return isOpen ? document.body.classList.add('pointer-events-none') : document.body.classList.remove('pointer-events-none')
    }

    return (
        <div>
        {/* Le bouton Burger */}
            <ButtonBurgerMenu toggleMenu={toggleMenu} isOpen={isOpen} className={isOpen ? 'hidden' : ''}/>

        {/* Le menu qui apparaît en mobile */}
            <div
                className={`fixed flex flex-col left-0 top-0 w-full bg-black opacity-80 h-[100vh] shadow-lg p-10 space-y-4 md:hidden ${isOpen ? 'block' : 'hidden'}`}
            >
                <ButtonBurgerMenu toggleMenu={toggleMenu} overflowBody={overflowBody} isOpen={isOpen} className={'self-end'}/> 
                <Navigation className="flex flex-col text-[#8B4513] space-x-8 font-light items-center space-y-8"/>
        </div>

        {/* Le menu pour les écrans plus grands (Desktop) */}
            <div className="hidden md:flex space-x-6 text-gray-800"> 
                <Navigation className="flex text-[#8B4513] space-x-8 font-light items-center" />
            </div>
        </div>
    );
};

export default BurgerMenu;
