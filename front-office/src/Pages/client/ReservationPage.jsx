import { useEffect, useState } from "react";
import { ReservationCard } from "../../components/visiteur/ReservationCard";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import { fetchReservation } from "../../services/reservationService";

const MesReservations = () => {
    const { token, user } = useToken();
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [current_page, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        const getReservation = async () => {
            try {
                const fetchData = await fetchReservation(token, current_page);
                setMessage(fetchData.message);
                setCurrentPage(fetchData.data.current_page);
                setReservations(fetchData.data);
                
            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Erreur de récupération",
                    text: error.message,
                    confirmButtonText: "Réessayer",
                    confirmButtonColor: "#d33",
                });
            } finally {
                setIsLoading(false);
            }

        }
        getReservation();

    }, [current_page]);
    
    // const handleCancelReservation = (reservationId) => {
    //     const 
    // };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-[#8B4513] mt-6 mb-4 text-center">Mes Réservations</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3 col-span-full">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (reservations && reservations?.data?.length > 0) ? (
                        reservations?.data.map(reservation => (
                            <ReservationCard key={reservation.id} reservation={reservation} />
                        ))
                    
                ) : (
                    <p className="text-[#8B4513] text-center col-span-full">{message}</p>
                )}
            </div>
        </div>
    );
}

export default MesReservations;