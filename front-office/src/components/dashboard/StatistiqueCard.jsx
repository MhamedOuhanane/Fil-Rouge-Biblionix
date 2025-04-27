export const StatistiqueCard = ({ title, icon, rating }) => {
    return (
        (title && icon && rating) &&

        <div className="md:h-28 bg-gradient-to-r from-[#ff984484] via-orange-200 to-[#FCE3C9] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-lg font-semibold text-[#4a2c2a] mb-3 flex items-center ">
                <span className="text-2xl mr-1 md:mr-3">{icon}</span>
                {title}
            </h3>
            <p className="text-3xl font-bold text-[#5e2d05]">{rating}</p>
        </div>
    )
}