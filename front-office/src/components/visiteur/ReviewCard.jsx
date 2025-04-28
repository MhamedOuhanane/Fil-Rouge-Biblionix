import StarRating from "../livres/StarRating";

const ReviewCard = ({ review }) => {
    const reviewer = review.reviewtable1;
    const reviewedEntity = review.reviewtable2;

    return (
        <div className="bg-[#FCE3C9] rounded-lg shadow-md p-6 mx-2 flex flex-col h-64">
            <div className="flex items-center mb-4">
                <StarRating rating={parseFloat(review.rating)} />
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{review.content}</p>
            <div className="mt-auto">
                <p className="text-sm font-semibold text-[#8B4513]">
                    Sur : {reviewedEntity.title || `${reviewedEntity.first_name} ${reviewedEntity.last_name}`}
                </p>
                <p className="text-xs text-gray-500">
                    Par : {reviewer.first_name} {reviewer.last_name}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;