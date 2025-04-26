
const CategorieCard = ({ categorie }) => {

    return (
        <div
            key={categorie.id}
            className="bg-[#FCE3C9] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center py-6"
          >
            <div className="mb-4">{categorie.icon}</div>
            <h3 className="text-lg mb-2">{categorie.title}</h3>
            <p className="text-sm mb-4 text-center px-4">{categorie.description}</p>
            <Link to={`livre/?categorie_id=${categorie.id}`}
              className="bg-[#F4A460] text-white px-4 py-2 rounded hover:bg-orange-400"
            >
              Explorer
            </Link>
        </div>
    )
}

export default CategorieCard;