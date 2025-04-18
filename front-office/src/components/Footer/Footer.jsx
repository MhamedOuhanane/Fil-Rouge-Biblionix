import React from 'react';
import { BiblionixLogo, EmailIcon, LocationIcon, PhoneIcon } from '../../Icons/Icons';
import { Link } from 'react-router-dom';
import Social from './SosialIcons';

function Footer() {
  return (
    <footer className="bg-[#BBA79D] pt-8 w-full h-auto">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {/* About section */}
          <div>
            <div className="flex items-center mb-4">
              <BiblionixLogo />
              <h3 className="text-xl font-bold ml-2">Biblionix</h3>
            </div>
            <p className="text-sm text-[#5D4037]">
              Biblionix est une plateforme innovante dédiée à la gestion des livres dans les bibliothèques,
              conçue pour répondre aux besoins variés de ses utilisateurs : bibliothécaires, administrateurs,
              membres et écrivains.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-[]">
              <li><Link to="#" >Accueil</Link></li>
              <li><Link to="#" >Catalogue</Link></li>
              <li><Link to="#" >Services</Link></li>
              <li><Link to="#" >À propos</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
            <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                <li className='flex gap-2 items-center'><PhoneIcon size={14}/>+212-617-860000</li>
                <li className='flex gap-2 items-center'><EmailIcon size={14}/>biblionix06@gmail.com</li>
                <li className='flex gap-2 items-center'><LocationIcon size={14}/> Biblionix Safi</li>
                </ul>
            </div>
            <div>
            <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
                <Social />
            </div>
        </div>
        
        <div className=" bg-[#9B9B9B] border-t mt-6 p-1 text-center">
          <p className='text-black text-sm md:text-md'>© 2025 Biblionix. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;