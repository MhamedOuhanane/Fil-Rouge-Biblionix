import { Link } from "react-router-dom";

const CategorieCard = ({ categorie }) => {
    const BASE_URL = "http://127.0.0.1:8000/storage";
    const logo = categorie.logo ? `${BASE_URL}/${categorie.logo}` : null;

    return (
        <div
            key={categorie.id}
            className="bg-[#FCE3C9] gap-2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center py-6"
          >
            <div className="mb-4">
                <img 
                    src={`${logo}`} 
                    className="w-10"
                    alt={`${categorie.title} logo`} 
                /> 
            </div>
            <h3 className="text-lg mb-5">{categorie.title}</h3>
            <Link to={`/library/${categorie.id}/livres`}
              className="bg-[#F4A460] text-white px-4 py-2 rounded hover:bg-orange-400"
            >
              Explorer
            </Link>
        </div>
    )
}

export default CategorieCard;