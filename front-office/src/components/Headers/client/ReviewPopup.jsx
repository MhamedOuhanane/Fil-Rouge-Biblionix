
import React from 'react';

function StarRating({ rating, onRatingChange }) {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={() => onRatingChange(i + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

function ReviewPopup({ show, onClose, onSubmit, reviewContent, setReviewContent, reviewRating, setReviewRating }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Ajouter un avis</h2>
                <div className="mb-4">
                    <label className="block text-[#8B4513] mb-2">Note :</label>
                    <StarRating rating={reviewRating} onRatingChange={setReviewRating} />
                </div>
                <div className="mb-4">
                    <label className="block text-[#8B4513] mb-2">Commentaire :</label>
                    <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        rows="4"
                        placeholder="Écrivez votre avis ici..."
                    />
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