

export const StatistiqueCard = ({ titre, icon, rating }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-base text-[#4a2c2a] mb-2">{icon} {titre}</h3>
            <p className="text-2xl font-bold text-[#4a2c2a]">{rating}</p>
        </div>
    )
}