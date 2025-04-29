import { useEffect, useState } from "react";
import StarRating from "../../components/livres/StarRating";
import { useParams } from "react-router-dom";
import { FindLivre } from "../../services/LivreService";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import useToken from "../../store/useToken";
import ReviewLivre from "../../components/reviews/ReviewsLivre";

const LivreDetails = () => {
    const { user } = useToken();
    const { livre_id } = useParams();
    const [livre, setLivre] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = "http://127.0.0.1:8000/storage";
    const photoLivre = livre ? `${BASE_URL}/${livre.photo}` : null;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dataFetch = await FindLivre("", livre_id);
                setLivre(dataFetch.livre);
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
    console.log(livre);
    


    const handleReservation = (e) => {
        e.preventDefault();
    };
    

    const canReserve = livre.disponibilite === "Disponible" && livre.quantity > 0 && user;

    return (
        <div className="container mx-auto p-6">
            <div className="mt-6 bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (!livre || livre?.length === 0 ? (
                    <p className="text-center text-orange-400">Ce livre n'existe pas.</p>
                ) : (
                    <>
                        <div className="md:w-1/3">
                            <img
                                src={photoLivre}
                                alt={livre.title}
                                className="w-full h-auto rounded-lg shadow-sm"
                            />
                        </div>

                        <div className="md:w-2/3">
                            <h1 className="text-3xl font-bold text-[#8B4513] mb-2">{livre.title}</h1>
                            <p className="text-[#8B4513] mb-2"><strong>Auteur:</strong> {livre.author}</p>
                            <p className="text-[#8B4513] mb-2"><strong>Catégorie:</strong> {livre?.categorie?.title}</p>
                            <p className="text-[#8B4513] mb-2"><strong>Résumé:</strong> {livre.summary}</p>
                            <p className="text-[#8B4513] mb-2"><strong>Statut:</strong> {livre.status_livre}</p>
                            <p className="text-[#8B4513] mb-2">
                                <strong>Disponibilité:</strong> 
                                <span className={`ml-2 px-2 py-1 rounded text-white ${
                                    livre.disponibilite === "Disponible" ? "bg-green-500" :
                                    livre.disponibilite === "Rupture de stock" ? "bg-orange-500" :
                                    "bg-red-500"
                                }`}>
                                    {livre.disponibilite}
                                </span>
                            </p>
                            <p className="text-[#8B4513] mb-2"><strong>Quantité en stock:</strong> {livre.quantity}</p>
                            <p className="text-[#8B4513] mb-2"><strong>Date d'ajout:</strong> {new Date(livre.created_at).toLocaleDateString()}</p>
                            <div className="mb-4">
                                <strong className="text-[#8B4513]">Tags:</strong>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {livre.tags && livre.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-[#d4c9b2] text-[#8B4513] rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <strong className="text-[#8B4513]">Note moyenne:</strong>
                                <div className="flex items-center mt-1">
                                    <StarRating rating={livre?.average_rating ?? 0} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold text-[#8B4513] mb-2">Réserver ce livre</h2>
                                <button
                                    onClick={handleReservation}
                                    disabled={!canReserve}
                                    className={`w-full p-3 rounded-lg text-white transition ${
                                        canReserve
                                            ? "bg-[#8B4513] hover:bg-[#5a4d3b]"
                                            : "bg-gray-400 cursor-not-allowed "
                                    }`}
                                >
                                    Réserver
                                </button>
                                    {!user && (
                                        <p className="mt-2 text-sm text-red-600">
                                        Vous devez être connecté pour réserver ce livre.
                                        </p>
                                    )}
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <ReviewLivre reviews={livre?.review_on_livre} />
        </div>
    );
}


export default LivreDetails;