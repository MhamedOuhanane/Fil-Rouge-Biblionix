import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonBurgerMenu from './ButtonBurgerMenu';

const BurgerMenu = () => {
    const { pathname } = useLocation();
    const stylePathName = (paths) => {return paths.includes(pathname) ? 'text-[#CD853F]' : ''};

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const overflowBody = () => {
        return isOpen ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
    }

    return (
        <div>
        {/* Le bouton Burger */}
            <ButtonBurgerMenu toggleMenu={toggleMenu} isOpen={isOpen} className={isOpen ? 'hidden' : ''}/>

        {/* Le menu qui apparaît en mobile */}
            <div
                className={`fixed flex flex-col left-0 top-0 w-full bg-black opacity-75 h-[100vh] shadow-lg p-10 space-y-4 md:hidden ${isOpen ? 'block' : 'hidden'}`}
            >
                <ButtonBurgerMenu toggleMenu={toggleMenu} overflowBody={overflowBody} isOpen={isOpen} className={'self-end'}/> 
                <ul className="flex flex-col text-[#8B4513] space-x-8 font-light items-center space-y-8">
                    <li>
                        <Link to="#accueil" className={stylePathName(["/"])}>Accueil</Link>
                    </li>
                    <li className="relative group">
                        <Link to="/" className={`flex items-center ${stylePathName(["/books", "/categorise"])}`}>
                            Bibliothèque
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </Link>
                    </li>
                </ul>
        </div>

        {/* Le menu pour les écrans plus grands (Desktop) */}
            <div className="hidden md:flex space-x-6 text-gray-800"> 
                <ul className="flex text-[#8B4513] space-x-8 font-light items-center">
                    <li>
                        <Link to="#accueil" className={stylePathName(["/"])}>Accueil</Link>
                    </li>
                    <li className="relative group">
                        <Link to="/"  className={`flex items-center ${stylePathName(["/books", "/categorise"])}`}>
                            Bibliothèque
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BurgerMenu;
