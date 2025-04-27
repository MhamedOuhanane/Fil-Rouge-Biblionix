import React, { useEffect, useState } from 'react';
import { BiblionixLogo, SpinnerLoadingIcon } from '../../../Icons/Icons';
import CategorieCard from './CategorieCard';
import { fetchCategories } from '../../../services/categorieService';
import Swal from 'sweetalert2';

const CategorieSection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect (() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataFetch = await fetchCategories();
        setCategories(dataFetch.categories);
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Erreur de récupération",
          text: error.message,
          confirmButtonText: "Réessayer",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [])

  return (
    <section className="container mx-auto px-8 md:px-16 py-10">
      <h2 className="text-2xl mb-6 text-center">Explorez Nos Catégories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="flex items-center space-x-2 mt-3">
            <SpinnerLoadingIcon />
            <span className="text-amber-700">Chargement...</span>
          </div>
        ) : (categories.map((category, index) => (
            (index <= 3) && <CategorieCard categorie={category} /> 
          ))
        )}
      </div>
    </section>
  );
};

export default CategorieSection;