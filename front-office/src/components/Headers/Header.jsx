import React from 'react';
import Navbar from './Navbar';

export default function BiblionixHeader() {
  return (
    <header style={{ backgroundColor: '#BBA79D' }} className="absolute w-full h-24 ">
       <Navbar />
      <div className='flex justify-between items-center'>
            {/* Logo and Brand */}
        <div className="w-full p-4 px-40 flex items-center">
            <div>
            {/* SVG Logo */}
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20L50 10L90 20L50 30L10 20Z" stroke="#8B4513" strokeWidth="2" fill="none" />
                <path d="M10 20L50 30L50 80L10 70L10 20Z" stroke="#8B4513" strokeWidth="2" fill="none" />
                <path d="M50 30L90 20L90 70L50 80L50 30Z" stroke="#8B4513" strokeWidth="2" fill="none" />
                {/* Books inside */}
                <rect x="30" y="35" width="10" height="35" fill="#F0A04B" />
                <rect x="25" y="40" width="10" height="30" fill="#E28743" />
                <rect x="35" y="38" width="8" height="32" fill="#D4722E" />
            </svg>
            </div>
            <div>
            <h1 style={{ color: '#8B4513', fontFamily: 'Merriweather, serif' }} className="text-2xl font-bold">Biblionix</h1>
            <p style={{ color: '#8B4513', fontFamily: 'Roboto, sans-serif' }} className="text-xs">BIBLIOTHÈQUE MODERNE</p>
            </div>
        </div>
        
        {/* Navigation */}
        <nav>
            <ul className="flex space-x-8">
            <li>
                <a href="#accueil" style={{ color: '#8B4513', fontFamily: 'Merriweather, serif' }} className="font-medium hover:underline">Accueil</a>
            </li>
            <li className="relative group">
                <a href="#bibliotheque" style={{ color: '#8B4513', fontFamily: 'Merriweather, serif' }} className="font-medium hover:underline flex items-center">
                Bibliothèque
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                </a>
            </li>
            </ul>
        </nav>
      </div>
    </header>
  );
}