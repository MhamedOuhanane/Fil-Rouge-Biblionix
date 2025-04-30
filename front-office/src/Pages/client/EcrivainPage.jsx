import { useEffect, useState } from "react";
import StarRating from "../../components/livres/StarRating";
import useToken from "../../store/useToken";
import { fetchAuteurs } from "../../services/auteurService";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import Avatar from "../../components/Profiles/Avatar";
import PaginationGrad from "../../components/pagination/paginationGrid";
import SearchInput from "../../components/buttons/SearchInput";
import ReviewPopup from "../../components/Headers/client/ReviewPopup";
import { createReview } from "../../services/reviewService";

function EcrivainPage() {
    const { token } = useToken();
    const [authors, setAuthors] = useState([]);
    const [current_page, setCurrentPage] = useState(1);
    const [last_page, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [errors, setErrors] = useState({});
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const initialFormReview = {
        content: "",
        rating: 0,
        review_type: "Auteur",
        reviewOn_id: null,
    }
    const [formReveiw, setFormReveiw] = useState(initialFormReview);

    const handleChange = (name, value) => {
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
            setFormReveiw(initialFormReview);
            getAuteurs();
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
                timer: 1200,
                timerProgressBar: true,
            });
        }
    }

    const  getAuteurs = async () => {
        setIsLoading(true);
        try {
            const fetchData = await fetchAuteurs(token, searchItem, current_page);
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
    useEffect(() => {

        getAuteurs();
    }, [searchItem, current_page]);

    

    const handleNextPage = () => {
        if (current_page < last_page) {
            setCurrentPage(current_page + 1)
        }
    };

    const handlePreviousPage = () => {
        if (current_page > 1) {
            setCurrentPage(current_page - 1);
        }
    };
    console.log(formReveiw);
    
    

    return (
        <div className="bg-[#FDF5E6] mx-auto min-h-[500px] pb-8">
            <section className="bg-[#F5E6CC] py-12 px-6 text-center mb-6">
                <h1 className="text-xl md:text-4xl font-bold text-[#8B4513] mb-4">Découvrez Nos Écrivains</h1>
                <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
                    Explorez une vaste sélection d'écrivains talentueux, des classiques 
                    aux contemporains. Que vous soyez passionné de littérature, 
                    d'histoire ou de science-fiction, nous avons l'auteur parfait pour vous !
                </p>
            </section>

            <div className="mb-6 px-16">
                <SearchInput 
                    setSearchItem={setSearchItem}
                />
            </div>
            
            <div className="relative mt-6 bg-white rounded-lg shadow-md p-6 mx-8 md:mx-16">
                <ReviewPopup 
                    show={showReviewPopup}
                    onClose={closeReviewPopup}
                    formReview={formReveiw}
                    handleChange={handleChange}
                    onSubmit={handleSubmitReview}
                    errors={errors}
                />

                <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Écrivains</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3 col-span-full">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : ((authors && authors.length > 0) ? (
                        authors.map((author) => (
                            <div key={author.id} className="flex items-center gap-4 border-b border-[#d4c9b2] py-4">
                                
                                
                                <Avatar user={author} size="w-10 h-10" />
                                <div className="w-full flex justify-between">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col md:flex-row md:flex-initial items-center space-x-2">
                                                <span className="text-[#8B4513] font-semibold">{author.first_name} {author.last_name}</span>
                                                <StarRating rating={author.average_rating} />
                                            </div>
                                        </div>
                                        <p className="text-[#8B4513] text-xs mt-1"><strong>Email:</strong> {author.email}</p>
                                        <p className="text-[#8B4513] text-xs mt-1"><strong>Téléphone:</strong> {author.phone || "Non disponible"}</p>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <span className="text-[#8B4513] text-sm">{new Date(author.created_at).toLocaleDateString()}</span>
                                        <button
                                            onClick={() => openReviewPopup(author.id)}
                                            className="px-1 text-2xl"
                                        >
                                        🌟
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#8B4513]">{message}</p>
                    )
                )}
                {(authors && authors?.length > 0) && (
                    <PaginationGrad
                        currentPage={current_page}
                        totalPages={last_page}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                    />
                )}
            </div>
            
        </div>
    );
}

export default EcrivainPage;