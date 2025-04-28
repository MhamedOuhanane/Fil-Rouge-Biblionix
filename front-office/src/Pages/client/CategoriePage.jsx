import { useEffect, useState } from "react";
import CategoriePageCard from "../../components/visiteur/CategoriePageCard";
import { fetchCategories } from "../../services/categorieService";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <div className="bg-[#FDF5E6] min-h-screen py-10 px-6">
            <h1 className="text-3xl font-bold text-[#8B4513] text-center mb-8">Nos Catégories</h1>
            
            {isLoading ? (
            <div className="flex justify-center items-center space-x-2 mt-3">
                <SpinnerLoadingIcon />
                <span className="text-amber-700">Chargement...</span>
            </div>
            ) : (categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((categorie) => (
                        <CategoriePageCard
                            key={categorie.id}
                            categorie={categorie}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">{categories?.message}</p>
            ))}
        </div>
    );
};

export default CategoriesPage;