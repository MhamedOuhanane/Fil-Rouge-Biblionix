
const ReviewLivre = ({ reviews = [] }) => {
    return (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Avis des utilisateurs</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="border-b border-[#d4c9b2] py-4 last:border-b-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-[#8B4513] font-semibold">{review.user}</span>
                                <span className="ml-2 text-yellow-500">{'★'.repeat(Math.round(review.rating))}</span>
                                <span className="text-gray-400">{'★'.repeat(5 - Math.round(review.rating))}</span>
                                <span className="ml-2 text-[#8B4513] text-sm">({review.rating}/5)</span>
                            </div>
                            <span className="text-[#8B4513] text-sm">{review.date}</span>
                        </div>
                        <p className="text-[#8B4513] mt-1">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-[#8B4513]">Aucun avis pour ce livre pour le moment.</p>
            )}
        </div>
    )
} 

export default ReviewLivre;