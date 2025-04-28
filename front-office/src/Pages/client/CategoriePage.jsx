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
        <div className="bg-[#FDF5E6] min-h-screen">
            <section className="bg-[#F5E6CC] py-12 px-6 text-center mb-6">
                <h1 className="text-4xl font-bold text-[#8B4513] mb-4">Explorez Nos Catégories</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Découvrez une large gamme de catégories pour tous les goûts et intérêts. Que vous soyez passionné de mangas, de science, ou de littérature, nous avons quelque chose pour vous !
                </p>
            </section>

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