import { Link } from "react-router-dom";
import StarRating from "../livres/StarRating";

const BookCard = ({ livre }) => {
    const BASE_URL = "http://127.0.0.1:8000/storage";
    const photo = livre.photo ? `${BASE_URL}/${livre.photo}` : null;

    const styleDisponibilite = {
        'Disponible': "bg-emerald-300",
        'Rupture de stock': "bg-blue-200",
        'Indisponible': "bg-orange-300",
    }
    

    return (
        <div
            className="relative bg-[#FCE3C9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between items-center py-4"
        >
            <div className="absolute top-2 right-2 ">
                <span className={`text-xs text-center px-2 p-1 rounded-full ${styleDisponibilite[livre.disponibilite]}`}>{livre.disponibilite}</span>
            </div>
            <div className="mb-4">
                <img 
                    src={photo} 
                    className="w-auto h-48 object-cover"
                    alt={`${livre.title} photo`} 
                /> 
            </div>
            <h3 className="text-lg font-[merriweather] text-center mb-2 ">{livre.title}</h3>
            <p className="text-sm text-gray-600 mb-2">👤 {livre.author}</p>
            <div className="flex items-center mb-4 text-center">
                <span className="text-yellow-500">
                    <StarRating rating={livre.average_rating} />
                </span>
            </div>
            <Link 
                to={`/library/${livre.categorie_id}/livre/${livre.id}`}
                className="bg-[#F4A460] text-white px-4 py-2 rounded hover:bg-orange-400"
            >
                Explorer
            </Link>
        </div>
    );
};

export default BookCard;