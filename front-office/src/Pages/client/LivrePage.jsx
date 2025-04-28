import { useEffect, useState } from "react";
import { fetchLivre } from "../../services/LivreService";
import Swal from "sweetalert2";
import BookCard from "../../components/visiteur/LivreCard";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import { useParams } from "react-router-dom";
import { SelecteCategorie } from "../../components/filtrage/selecteFiltrage";
import { fetchCategories } from "../../services/categorieService";

const LivrePage = () => {
    const { categorie_id } = useParams();
    
    const [categories, setCategories] = useState([])
    const [livres, setLivres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const fetchCate = async () => {
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
        fetchCate();
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dataFetch = await fetchLivre("", "", categorie_id ?? "");
                setLivres(dataFetch.data);
                setMessage(dataFetch.message);         
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
    }, [categorie_id]); 

    return (
        <div className="bg-[#FDF5E6] min-h-screen">
            <section className="bg-[#F5E6CC] py-12 px-6 text-center mb-5">
                <h1 className="text-xl md:text-4xl font-bold text-[#8B4513] mb-4">Découvrez Nos Livres</h1>
                <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
                    Parcourez notre vaste collection de livres, filtrez par catégorie, tags ou disponibilité, et trouvez votre prochaine lecture préférée.
                </p>
            </section>

            <div className="max-w-6xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <SelecteCategorie title={'Tous les categories'} valueInisial={categorie_id} values={categories} />
                </div>
            </div>
            <div className="mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (livres && livres.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 md:px-16 pb-5">
                        {livres.map((livre) => (
                            <BookCard
                                key={livre.id}
                                livre={livre}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-orange-400">{message}</p>
                ))}
            </div>
        </div>
    );
};

export default LivrePage;