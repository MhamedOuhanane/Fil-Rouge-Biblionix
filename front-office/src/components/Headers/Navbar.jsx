import React from 'react';
import { EmailIcon, PhoneIcon } from '../../Icons/Icons';

function Navbar() {
  return (
    <div className="flex justify-between items-center p-2 md:px-16 bg-[#DBC9C0]">
      <div className="flex space-x-4 md:space-x-8 text-sm">
        <div className="flex items-center space-x-1 md:space-x-2">
          <PhoneIcon size={16} className="text-black hidden sm:block" />
          <span style={{ color: '#8B4513' }}>+212-617-860000</span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <EmailIcon size={16} className="text-black hidden sm:block" />
          <span className='text-[#8B4513]'>biblionix06@gmail.com</span>
        </div>
      </div>
      <div className="flex space-x-4">
        <a href="#inscription">Inscription</a>
        <a href="#connexion">Connexion</a>
      </div>
    </div>
  );
}

export default Navbar;