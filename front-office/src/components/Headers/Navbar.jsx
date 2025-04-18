import React from 'react';
import { EmailIcon, PhoneIcon } from '../../Icons/Icons';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex justify-between items-center h-8 px-8 md:px-16 bg-[#DBC9C0]">
      <div className="flex space-x-4 md:space-x-8 text-sm">
        <div className="flex items-center space-x-1 md:space-x-4">
          <PhoneIcon size={16}/>
          <span className='text-[#8B4513]  hidden sm:block'>+212-617-860000</span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-4">
          <EmailIcon size={16} />
          <span className='text-[#8B4513]  hidden sm:block'>biblionix06@gmail.com</span>
        </div>
      </div>
      <div className="flex space-x-4 text-sm md:text-md">
        <Link to="#inscription">Inscription</Link>
        <Link to="#connexion">Connexion</Link>
      </div>
    </div>
  );
}

export default Navbar;