import React from 'react';
import { BiblionixLogo } from '../../../Icons/Icons';
import { Link } from 'react-router-dom';
import BurgerMenu from './burgerMenu/BurgerMenu';
import Navbar from './Navbar';

export default function BiblionixHeader() {
  return (
    <header className="fixed z-50 bg-[#BBA79D] w-full h-auto md:h-25 ">
       <Navbar />
      <div className='flex justify-between items-center px-8 md:px-16'>
        <div>
            <div className="w-full flex items-center">
                <Link to={'/'}>
                  <BiblionixLogo />
                </Link>
                <div className='hidden md:block'>
                    <h1  className="text-[1.3rem] font-bold ">Biblionix</h1>
                    <p className="text-xs hover:underline">BIBLIOTHÈQUE MODERNE</p>
                </div>
            </div>
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
}