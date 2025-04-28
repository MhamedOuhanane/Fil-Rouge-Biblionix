const StarRating = ({ rating }) => {
    rating = Number(rating);
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const remainingStars = Math.max(0, maxStars - fullStars - (hasHalfStar ? 1 : 0));

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <span key={index} className="text-yellow-500 text-lg">
                    ★
                </span>
            ))}
            {hasHalfStar && (
                <span className="text-yellow-500 text-lg">⯪</span>
            )}
            {[...Array(remainingStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-yellow-500 text-lg">
                    ☆
                </span>
            ))}
            <span className="text-gray-600 ml-1 text-sm">{rating.toFixed(1)}/5</span>
        </div>
    );
};

export default StarRating;