import { useState } from "react";
import { ReservationCard } from "../../components/visiteur/ReservationCard";

const MesReservations = () => {
    const [reservations, setReservations] = useState([
        {
            id: 1,
            start_date: "2025-04-01T10:00:00Z",
            end_date: "2025-04-15T10:00:00Z",
            status_Res: "En Cours",
            prolongement: "2025-04-20",
            status_Pro: "En Attente",
            returned_at: null,
            livre: { id: 1, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry" }
        },
        {
            id: 2,
            start_date: "2025-04-05T14:00:00Z",
            end_date: "2025-04-20T14:00:00Z",
            status_Res: "Accepter",
            prolongement: null,
            status_Pro: "Pas de Prolengement",
            returned_at: null,
            livre: { id: 2, title: "Les Misérables", author: "Victor Hugo" }
        },
        {
            id: 3,
            start_date: "2025-03-10T09:00:00Z",
            end_date: "2025-03-25T09:00:00Z",
            status_Res: "Terminer",
            prolongement: null,
            status_Pro: "Pas de Prolengement",
            returned_at: "2025-03-24T15:00:00Z",
            livre: { id: 3, title: "Orgueil et Préjugés", author: "Jane Austen" }
        }
    ]);

    // Gestion de l'annulation d'une réservation
    const handleCancelReservation = (id) => {
        setReservations(reservations.map(reservation => 
            reservation.id === id && (reservation.status_Res === "En Attente" || reservation.status_Res === "En Cours")
                ? { ...reservation, status_Res: "Refuser" }
                : reservation
        ));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-[#8B4513] mt-6 mb-4 text-center">Mes Réservations</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.length > 0 ? (
                    reservations.map(reservation => (
                        <ReservationCard reservation={reservation} />
                    ))
                ) : (
                    <p className="text-[#8B4513] text-center col-span-full">Aucune réservation trouvée.</p>
                )}
            </div>
        </div>
    );
}

export default MesReservations;