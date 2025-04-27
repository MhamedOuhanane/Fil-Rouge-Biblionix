import React from 'react';
import { useMediaQuery } from 'react-responsive';
import CategoriesSection from '../../components/visiteur/home/CategorieSection';
import ServicesSection from '../../components/visiteur/home/serviceSection';
import BooksSection from '../../components/visiteur/home/LivreSection';


const HomePage = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="flex flex-col min-h-screen">

        <section
            className="px-4 py-10 flex flex-col md:flex-row items-center md:h-[85vh] scrollbar-hide hero-bg-image"
            >
            {/* Contenu textuel à gauche */}
            <div className="md:w-5/12 bg-[#fce3c9c8] p-6 rounded-lg">
                <h1 className="text-4xl font-merriweather mb-4">Bienvenue chez Biblionix</h1>
                <p className="text-lg text-[#6B4423] mb-6">
                    Une plateforme innovante pour gérer vos livres, adaptée aux bibliothécaires, 
                    membres et écrivains. Découvrez une expérience simplifiée pour organiser, 
                    consulter et enrichir votre bibliothèque.
                </p>
                <button
                className="bg-[#8B4513] text-[#FCE3C9] px-4 py-2 rounded hover:bg-[#61320f] transition-colors"
                >
                    Découvrir Nos Livres
                </button>
            </div>

            {isDesktop && 
                <div className="md:w-1/2 flex justify-center items-center">
                    <img src="../../../LOGO-Hero-Section.png" className='max-w-5/12' alt="Logo-Hero" />
                </div>
            }
        </section>
        <ServicesSection />
        <CategoriesSection />
        <BooksSection />
    </div>
  );
};

export default HomePage;