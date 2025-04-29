import { useEffect, useState } from "react";
import { fetchLivre } from "../../../services/LivreService";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../../Icons/Icons";
import BookCard from "../LivreCard";


const BooksSection = () => {
    const [livres, setLivres] = useState({});
        const [isLoading, setIsLoading] = useState(false);
        
        
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dataFetch = await fetchLivre();
                setLivres(dataFetch.data);         
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
        <section className="py-10 px-8 md:px-16">
            <h2 className="text-2xl font-bold text-[#8B4513] text-center mb-8">Nos Livres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {isLoading ? (
                    <div className="flex items-center space-x-2 mt-3">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (
                    livres && livres?.data?.length === 0 ? (
                        <div className="flex items-center col-start-1 col-end-6  mt-3">
                            <span className="text-orange-400">{livres.message}</span>
                        </div>
                    ) : (
                        livres?.data && livres?.data.map((livre, index) => (
                            index < 5 && (
                                <BookCard
                                    key={livre.id}
                                    livre={livre}
                                />
                            )
                        ))
                    )
                )}
            </div>
        </section>
    );
};

export default BooksSection;