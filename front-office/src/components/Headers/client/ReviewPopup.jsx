


function StarRating({ rating, onRatingChange }) {
    const handleClick = (index, isRight) => {
        const newRating = index + (isRight ? 1 : 0.5);
        onRatingChange('rating', newRating);
    };

    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => {
                const fullStars = Math.floor(rating);
                const hasHalfStar = rating - fullStars >= 0.5;
                const isFilledLeft = i < fullStars || (i === fullStars && hasHalfStar);
                const isFilledRight = i < fullStars;

                return (
                    <div key={i} className="flex -space-x-3">
                        <span
                            className={`cursor-pointer text-5xl ${isFilledLeft ? "text-yellow-500" : "text-gray-400"}`}
                            onClick={() => handleClick(i, false)}
                        >
                            ⯨
                        </span>
                        <span
                            className={`cursor-pointer text-5xl ${isFilledRight ? "text-yellow-500" : "text-gray-400"}`}
                            onClick={() => handleClick(i, true)}
                        >
                            ⯩
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

const ReviewPopup = ({ show, onClose, onSubmit, errors, formReview, handleChange }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-[#6b43239c] flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Ajouter un avis</h2>
                <div className="mb-4">
                    <label className="block text-[#8B4513] mb-2">Note :</label>
                    <StarRating rating={formReview.rating} onRatingChange={handleChange} />
                    {errors.rating && <p className='text-red-400 text-sm'>{errors.rating}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-[#8B4513] mb-2">Commentaire :</label>
                    <textarea
                        value={formReview.content}
                        onChange={(e) => handleChange('content', e.target.value)}
                        className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        rows="4"
                        placeholder="Écrivez votre avis ici..."
                    />
                    {errors.content && <p className='text-red-400 text-sm'>{errors.content}</p>}
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-[#6b5e48] rounded hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-[#6b5e48] text-white rounded hover:bg-[#5a4d3b] transition"
                    >
                        Soumettre
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewPopup;