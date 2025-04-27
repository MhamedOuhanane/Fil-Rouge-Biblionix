import React from 'react';
import { BiblionixLogo } from '../../../Icons/Icons';
import CategorieCard from './CategorieCard';

// Données simulées pour les catégories avec contenu
const categories = [
  {
    id: 1,
    title: 'Fiction',
    icon: <BiblionixLogo className="w-12 h-12" />, // La couleur est gérée par body { color: #A0522D; }
    description: 'Romans et histoires captivantes pour tous les âges.',
    link: '/categories/fiction',
  },
  {
    id: 2,
    title: 'Histoire',
    icon: <BiblionixLogo className="w-12 h-12" />,
    description: 'Livres sur les événements historiques et les biographies.',
    link: '/categories/histoire',
  },
  {
    id: 3,
    title: 'Science',
    icon: <BiblionixLogo className="w-12 h-12" />,
    description: 'Livres sur les sciences : la nature, les animaux, et plus.',
    link: '/categories/science',
  },
];

const CategorieSection = () => {
  return (
    <section className="container mx-auto px-8 md:px-16 py-10">
      <h2 className="text-2xl mb-6 text-center">Explorez Nos Catégories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategorieCard categorie={category} />
        ))}
      </div>
    </section>
  );
};

export default CategorieSection;