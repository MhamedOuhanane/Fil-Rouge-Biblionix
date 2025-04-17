import React from 'react';
import { EmailIcon, PhoneIcon } from '../../Icons/Icons';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-[#DBC9C0] text-black">
      <div className="flex space-x-8">
        {/* Phone Number */}
        <div className="flex items-center space-x-2">
          <PhoneIcon size={20}/>
          <span>+212-617-860000</span>
        </div>
        
        {/* Email */}
        <div className="flex items-center space-x-2">
          <EmailIcon size={16}/>
          <span>biblionix06@gmail.com</span>
        </div>
      </div>
      
      <div className="flex space-x-6">
        <a href="#inscription" >Inscription</a>
        <a href="#connexion" >Connexion</a>
      </div>
    </div>
  );
}