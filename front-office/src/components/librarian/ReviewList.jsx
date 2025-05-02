import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import StarRating from "../livres/StarRating";
import DeletedButton from "../buttons/DeletedButton";

const ReviewList = ({ reviews: initialReviews, message, onDelete }) => {
    const [reviews, setReviews] = useState(initialReviews || []);
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const lengthString = isDesktop ? 50 : 30;

    useEffect(() => {
        setReviews(initialReviews || []);
    }, [initialReviews]);

    const fullName = (element) => {
        return `${element.first_name} ${element.last_name}`;
    }

    const typeReview = (element) => {
        return element.reviewtable2_type === 'App\\Models\\Auteur' ? 'Auteur' : 'Livre';
    }
    console.log(reviews);
    

    return (
        <div className="p-2 w-full">
            {reviews && reviews.length === 0 && (
                <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
            )}
            {reviews && reviews.length !== 0 && (
                <>
                {isDesktop ? (
                    <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-[#d4c9b2]">
                        <th className="text-left p-3 text-[#8B4513]">User</th>
                        <th className="text-left p-3 text-[#8B4513]">Contenu</th>
                        <th className="text-left p-3 text-[#8B4513]">Note</th>
                        <th className="text-left p-3 text-[#8B4513]">Avis Sur</th>
                        <th className="text-left p-3 text-[#8B4513]">Avis Type</th>
                        <th className="text-left p-3 text-[#8B4513]">Créer En</th>
                        <th className="text-left p-3 text-[#8B4513]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                        <tr key={review.id} className="border-b border-[#d4c9b2]">
                            <td className="p-1 pl-2 text-[#8B4513] text-xs font-[merriweather]">
                                {fullName(review.reviewtable1)}
                            </td>
                            <td className="p-1 pl-2 text-[#8B4513] text-xs">
                                {review.content?.substring(0, lengthString)}...
                            </td>
                            <td className="p-1 text-[#8B4513] text-sm">
                                <StarRating rating={review.rating} />
                            </td>
                            <td className="p-1 text-[#8B4513] text-sm">
                                {review.reviewtable2?.title ?? fullName(review.reviewtable1)}
                            </td>
                            <td className="p-1 text-[#8B4513] text-sm">
                                {typeReview(review)}
                            </td>
                            <td className="p-1 text-[#8B4513] text-sm">
                                {new Date(review.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-1 space-x-2">
                            <DeletedButton element={review} handleAction={onDelete} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                        key={review.id}
                        className="bg-white rounded-lg shadow-sm p-4 border border-[#d4c9b2]"
                        >
                        <div className="flex-1">
                            <h3 className="text-[#8B4513] font-[merriweather] text-lg font-semibold">
                            {fullName(review.reviewtable1)}
                            </h3>
                            <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Contenu : </span>
                            {review.content?.substring(0, lengthString)}...
                            </p>
                            <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Note : </span>
                            {review.rating}
                            </p>
                            <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Avis Sur : </span>
                            {review.reviewtable2?.title ?? fullName(review.reviewtable1)}
                            </p>
                            <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Avis Type : </span>
                            {typeReview(review)}
                            </p>
                            <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Créer En : </span>
                            {new Date(review.created_at).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2 mt-2">
                                <DeletedButton element={review} handleAction={onDelete} />
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default ReviewList;