import { Link } from "react-router-dom";

const BookCard = ({ book, link }) => {
    const BASE_URL = "http://127.0.0.1:8000/storage";
    const cover = book.cover ? `${BASE_URL}/${book.cover}` : null;

    return (
        <div
            className="bg-[#FCE3C9] gap-2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center py-6"
        >
            <div className="mb-4">
                <img 
                    src={cover} 
                    className="w-32 h-48 object-cover"
                    alt={`${book.title} cover`} 
                /> 
            </div>
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <div className="flex items-center mb-4">
                <span className="text-yellow-500"></span>
                <span className="text-gray-600 ml-1">{book.rating}/5</span>
            </div>
            <Link 
                to={link}
                className="bg-[#F4A460] text-white px-4 py-2 rounded hover:bg-orange-400"
            >
                Explorer
            </Link>
        </div>
    );
};

export default BookCard;