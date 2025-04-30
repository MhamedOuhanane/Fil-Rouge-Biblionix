
export const ReservationCard = ({ reservation }) => {
    const styleStatus = {
        'Pas de Prolengement': 'bg-gray-500',
        'En Attente': 'bg-yellow-500',
        'Accepter': 'bg-green-500',
        'Refuser': 'bg-red-500',
        'En Cours': 'bg-blue-500',
        'Terminer': 'bg-orange-500',
    }
console.log(reservation);

    return (
        <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-2"
        >
            <h2 className="text-xl font-semibold text-[#8B4513]">{reservation.livre.title}</h2>
            <p className="text-[#8B4513]"><strong>Auteur:</strong> {reservation.livre.author}</p>
            <p className="text-[#8B4513]"><strong>Date de début:</strong> {new Date(reservation.start_date).toLocaleDateString()}</p>
            <p className="text-[#8B4513]"><strong>Date de fin:</strong> {new Date(reservation.end_date).toLocaleDateString()}</p>
            <p className="text-[#8B4513] flex flex-col">
                <strong>Statut:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${styleStatus[reservation.status_Res]}`}>
                    {reservation.status_Res}
                </span>
            </p>
            <p className="text-[#8B4513]">
                <strong>Prolongement:</strong> 
                {reservation.prolongement ? new Date(reservation.prolongement).toLocaleDateString() : "Aucun"}
            </p>
            <p className="text-[#8B4513] flex flex-col">
                <strong>Statut Prolongement:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${styleStatus[reservation.status_Pro]}`}>
                    {reservation.status_Pro}
                </span>
            </p>
            <p className="text-[#8B4513]">
                <strong>Date de retour:</strong> 
                {reservation.returned_at ? new Date(reservation.returned_at).toLocaleDateString() : "Non retourné"}
            </p>
            {(reservation.status_Res === "En Attente") && (
                <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Annuler
                </button>
            )}
        </div>
    )
}