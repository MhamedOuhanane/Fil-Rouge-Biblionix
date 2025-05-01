import { useEffect, useState } from "react"
import Avatar from "../Profiles/Avatar";
import StarRating from "../livres/StarRating";

const ReviewLivre = ({ reviews = [] }) => {
    const utilisateur = (review) => { return review ? review?.reviewtable1 : null}
    const [isOpen, setIsOpen] = useState(false);
    const [limitAffReviews, setLimitAffReviews] = useState(3);
    
    useEffect(() => {
        isOpen ? setLimitAffReviews(reviews?.length) : setLimitAffReviews(3);
    }, [isOpen]);

    return (
        <div className={`relative mt-6 bg-white rounded-lg shadow-md p-6`}>
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Avis des utilisateurs</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    (index < limitAffReviews) &&
                    <div key={index} className="w-full flex items-center gap-2 border-b border-[#d4c9b2] py-4 last:border-b-0">
                        <Avatar user={utilisateur(review)} size="w-10 h-10" />
                        <div>
                            <div className="w-full flex items-center justify-between space-x-5">
                                <div className="flex flex-col md:flex-row md:flex-initial items-center space-x-2">
                                    <span className="text-[#8B4513] font-semibold">{utilisateur(review).first_name} {utilisateur(review).first_name}</span>
                                    <StarRating rating={review.rating} />
                                </div>
                                <span className="text-[#8B4513] text-sm">{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[#8B4513] text-xs w-[90%] mt-1">{review.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-[#8B4513]">Aucun avis pour ce livre pour le moment.</p>
            )}
            {(reviews.length > 3) && (
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute bottom-0 hover:text-amber-900">
                    {isOpen ? 'retourne' : 'voir tous'}
                </button>
            )}
        </div>
    )
} 

export default ReviewLivre;