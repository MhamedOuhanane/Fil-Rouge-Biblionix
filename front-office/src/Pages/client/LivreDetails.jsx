import { useEffect, useState } from "react";
import StarRating from "../../components/livres/StarRating";
import { useParams } from "react-router-dom";
import { FindLivre } from "../../services/LivreService";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import useToken from "../../store/useToken";
import ReviewLivre from "../../components/reviews/ReviewsLivre";
import { CreateReservation } from "../../services/reservationService";
import ReviewPopup from "../../components/Headers/client/ReviewPopup";
import { createReview } from "../../services/reviewService";

const LivreDetails = () => {
    const { user, badge, token } = useToken();
    const { livre_id } = useParams();
    const [livre, setLivre] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [dateReserve, setDateReserve] = useState(() => {
        const now = new Date();
      
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() + 1);
        const start = startDate.toISOString().split('T')[0];
      
        const endDate = new Date(startDate);
        if (badge) {
            endDate.setDate(endDate.getDate() + badge.duration - 1); 
        }
        const end = endDate.toISOString().split('T')[0]; 
      
        return {
          minStartDate: startDate.toISOString().split('T')[0],  
          start_date: start,
          end_date: end,
        };
    });
    const BASE_URL = "http://127.0.0.1:8000/storage";
    const photoLivre = livre ? `${BASE_URL}/${livre.photo}` : null;
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const initialFormReview = {
        content: "",
        rating: 0,
        review_type: "Livre",
        reviewOn_id: null,
    }
    const [formReveiw, setFormReveiw] = useState(initialFormReview);

    const handleChange = (name, value) => {
        setErrors({[name]: ''});
        setFormReveiw((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    
    const openReviewPopup = (authorId) => {
        handleChange('reviewOn_id', authorId);
        setShowReviewPopup(true);
    };

    const closeReviewPopup = () => {
        setFormReveiw(initialFormReview);
        setErrors({});
        setShowReviewPopup(false);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!formReveiw.rating) {
            setErrors({rating: 'The rating field is required.'})
            return;
        } else if (formReveiw.content === "") {
            setErrors({content: 'The content field is required.'});
            return;
        }

        try {
            const insertData = await createReview(token, formReveiw);

            if (insertData.errors) {
                setErrors(insertData.errors)
                return;
            }
            setShowReviewPopup(false);
            setErrors({});
            setFormReveiw(initialFormReview);
            fetchData();
            Swal.fire({
                icon: 'success',
                title: 'Faire Review',
                text: insertData.message,
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Faire Review',
                text: error.message,
                showConfirmButton: false,
                // timer: 1200,
                timerProgressBar: true,
            });
        }
    }

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
    useEffect(() => {
        fetchData();
    }, []);

    const handleDateReservation = (value) => {
        const startDate = new Date(value);
      
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + badge?.duration - 1);
      
        setDateReserve(prev => ({
          ...prev,
          start_date: value,
          end_date: endDate.toISOString().split('T')[0],
        }));
        setErrors({});
    };
      

    const handleReservation = async (e) => {
        e.preventDefault();
        const formData = {
            start_date: dateReserve?.start_date,
            end_date: dateReserve?.end_date,
            livre_id: livre_id,
        }

        try {
            const fetchData = await CreateReservation(token, formData);

            if (fetchData.errors) {
                setErrors(errors);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Réservation réussie!',
                    text: fetchData.message,
                    color: 'green',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'green',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur de reservation: ',
                text: error.message,
                color: 'red',
                confirmButtonText: 'Réssayer',
                confirmButtonColor: 'red',
            });
        }
    };
    

    const canReserve = livre.disponibilite === "Disponible" && livre.quantity > 0 && user;

    return (
        <div className="relative container mx-auto p-6">
                <ReviewPopup 
                    show={showReviewPopup}
                    onClose={closeReviewPopup}
                    formReview={formReveiw}
                    handleChange={handleChange}
                    onSubmit={handleSubmitReview}
                    errors={errors}
                />
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
                                <button
                                    onClick={() => openReviewPopup(livre.id)}
                                    className="px-1 text-2xl"
                                >
                                🌟
                                </button>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold text-[#8B4513] mb-2">Réserver ce livre</h2>
                                {canReserve && (
                                    <div className="px-3 space-x-5 mb-2">
                                        <label htmlFor="startDate">Choisissez la date de début : </label>
                                        <input
                                            id="startDate"
                                            onChange={(e) => handleDateReservation(e.target.value)}
                                            type="date"
                                            value={dateReserve.start_date}
                                            min={dateReserve.minStartDate}
                                            className="border-2 p-2 rounded font-medium"
                                            />

                                        <label>Date de fin: </label>
                                        <input
                                            disabled
                                            type="date"
                                            value={dateReserve.end_date}
                                            className="border-2 p-2 rounded font-medium"        
                                            />
                                    </div>
                                )}
                                <button
                                    onClick={handleReservation}
                                    disabled={!canReserve}
                                    className={`w-full p-3 rounded-lg text-white transition ${
                                        canReserve
                                            ? "bg-[#8B4513] hover:bg-[#8c5a37]"
                                            : "bg-gray-400 cursor-not-allowed "
                                    }`}
                                >
                                    Réserver
                                </button>
                                    {!user && (
                                        <p className="mt-2 text-md text-red-600">
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