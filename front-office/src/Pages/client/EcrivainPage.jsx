import { useEffect, useState } from "react";
import StarRating from "../../components/livres/StarRating";
import useToken from "../../store/useToken";
import { fetchAuteurs } from "../../services/auteurService";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";

function EcrivainPage() {
    const { token } = useToken();
    const [authors, setAuthors] = useState([]);
    const [current_page, setCurrentPage] = useState(1);
    const [last_page, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const  getAuteurs = async () => {
            setIsLoading(true);
            try {
                const fetchData = await fetchAuteurs(token, "", current_page);
                setAuthors(fetchData?.autuers?.data);
                setMessage(fetchData.message);
                setLastPage(fetchData?.autuers?.last_page);
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
        }

        getAuteurs();
    }, [current_page]);
console.log(authors);

    return (
        <div className="bg-[#FDF5E6] mx-auto min-h-[500px]">
            <section className="bg-[#F5E6CC] py-12 px-6 text-center mb-6">
                <h1 className="text-xl md:text-4xl font-bold text-[#8B4513] mb-4">Découvrez Nos Écrivains</h1>
                <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
                    Explorez une vaste sélection d'écrivains talentueux, des classiques 
                    aux contemporains. Que vous soyez passionné de littérature, 
                    d'histoire ou de science-fiction, nous avons l'auteur parfait pour vous !
                </p>
            </section>
            
            <div className="relative mt-6 bg-white rounded-lg shadow-md p-6 mx-8 md:mx-16">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Écrivains</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3 col-span-full">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : ((authors && authors.length > 0) ? (
                        authors.map((author) => (
                            <div key={author.id} className="flex items-center gap-2 border-b border-[#d4c9b2] py-4 last:border-b-0">
                                
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-[#8B4513]">{author.first_name[0]}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col md:flex-row md:flex-initial items-center space-x-2">
                                            <span className="text-[#8B4513] font-semibold">{author.first_name} {author.last_name}</span>
                                            <StarRating rating={author.average_rating} />
                                        </div>
                                        <span className="text-[#8B4513] text-sm">{new Date(author.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-[#8B4513] text-xs mt-1"><strong>Email:</strong> {author.email}</p>
                                    <p className="text-[#8B4513] text-xs mt-1"><strong>Téléphone:</strong> {author.phone || "Non disponible"}</p>
                                    <p className="text-[#8B4513] text-xs mt-1">
                                        <strong>Statut:</strong> 
                                        <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                                            author.status === "Active" ? "bg-green-500" : "bg-red-500"
                                        }`}>
                                            {author.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#8B4513]">Aucun écrivain trouvé.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default EcrivainPage;