import React from 'react';
import { BiblionixLogo, EmailIcon, LocationIcon, PhoneIcon } from '../../Icons/Icons';
import { Link } from 'react-router-dom';
import Social from './SosialIcons';
import Navigation from '../Headers/client/Navigation';

function Footer() {
  return (
    <footer className="bg-[#BBA79D] pt-8 w-full h-auto">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {/* About section */}
          <div>
            <div className="w-full flex items-center">
              <Link to={'/'}>
                <BiblionixLogo />
              </Link>
              <div className='hidden md:block'>
                  <h1  className="text-xl font-bold">Biblionix</h1>
                  <p className="text-xs hover:underline">BIBLIOTHÈQUE MODERNE</p>
              </div>
            </div>
            <p className="text-sm text-[#5D4037]">
              Biblionix est une plateforme innovante dédiée à la gestion des livres dans les bibliothèques,
              conçue pour répondre aux besoins variés de ses utilisateurs : bibliothécaires, administrateurs,
              membres et écrivains.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#6B4423]">Liens Rapides</h3>
            <ul className="space-y-2 text-[]">
              <Navigation className={'space-y-3'} />
            </ul>
          </div>
          
          {/* Contact */}
            <div>
                <h3 className="text-lg font-bold mb-4 text-[#6B4423]">Contact</h3>
                <ul className="space-y-2 text-sm">
                <li className='flex gap-2 items-center'><PhoneIcon size={14}/>+212-617-860000</li>
                <li className='flex gap-2 items-center'><EmailIcon size={14}/>biblionix06@gmail.com</li>
                <li className='flex gap-2 items-center'><LocationIcon size={14}/> Biblionix Safi</li>
                </ul>
            </div>
            <div>
            <h3 className="text-lg font-bold mb-4 text-[#6B4423]">Suivez-nous</h3>
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