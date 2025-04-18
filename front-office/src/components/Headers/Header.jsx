import React from 'react';
import Navbar from './Navbar';
import { BiblionixLogo } from '../../Icons/Icons';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu/BurgerMenu';

export default function BiblionixHeader() {
  return (
    <header className="fixed bg-[#BBA79D] w-full h-auto md:h-25 ">
       <Navbar />
      <div className='flex justify-between items-center px-8 md:px-16'>
            {/* Logo and Brand */}
        <Link to={'/'}>
            <div className="w-full flex items-center">
                <BiblionixLogo />
                <div className='hidden md:block'>
                    <h1  className="text-[1.3rem] font-bold ">Biblionix</h1>
                    <p className="text-xs hover:underline">BIBLIOTHÈQUE MODERNE</p>
                </div>
            </div>
        </Link>
        {/* Navigation */}
        <BurgerMenu />
      </div>
    </header>
  );
}