import { Link } from "react-router-dom";

const CategoriePageCard = ({ categorie }) => {
    const BASE_URL = "http://127.0.0.1:8000/storage";
    const logo = categorie.logo ? `${BASE_URL}/${categorie.logo}` : null;

    return (
        <div className="bg-[#FFF5E1] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-6 relative">
            <div className="mb-4">
                <img
                    src={logo}
                    className="w-16 h-16 p-1 object-cover object-center rounded-full border-2 border-[#F4A460]"
                    alt={`${categorie.title} logo`}
                />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513] mb-2">{categorie.title}</h3>
            <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">{categorie.content}</p>
            <Link
                to={`/livres/${categorie.id}`}
                className="bg-[#F4A460] text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors"
            >
                Explorer
            </Link>
        </div>
    );
};

export default CategoriePageCard;