import { useEffect, useState } from "react";
import { ReservationCard } from "../../components/visiteur/ReservationCard";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import { deleteReservation, fetchReservation, updateReservation } from "../../services/reservationService";
import PaginationGrad from "../../components/pagination/paginationGrid";

const MesReservations = () => {
    const { token } = useToken();
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [current_page, setCurrentPage] = useState(1);
    const [last_page, setLastPage] = useState(1);
    const [dataprolongement, setDataProlongement] = useState({
        prolongement: null,
        status_Pro: "Pas de Prolengement",
    })

    const getReservation = async () => {
        setIsLoading(true);
        try {
            const fetchData = await fetchReservation(token, current_page);
            setMessage(fetchData.message);
            setCurrentPage(fetchData.data.current_page);
            setLastPage(fetchData.data.last_page);
            setReservations(fetchData.data);
            setDataProlongement({
                prolongement: fetchData?.data?.data?.prolongement,
                status_Pro: fetchData?.data?.data?.status_Pro,
            })
            
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

    useEffect(() => {
        getReservation();

    }, [current_page]);
    
    const handleProlongement = async (reservation) => {
        try {
            if (reservation.status_Res != 'En Cours') {
                throw new Error("Vous n'avait prolonger un reservation n'est pas en cours");
            }
            const reservationEnd = new Date(reservation?.end_date);
            reservationEnd.setDate(reservationEnd.getDate() + 3);
            setDataProlongement({
                prolongement: reservationEnd.toISOString().split('T')[0],
                status_Pro: 'En Attente',
            })
            
            const CancelReservation = await updateReservation(token, reservation, dataprolongement);
            Swal.fire({
                icon: 'success',
                title: 'Modification du Reservation',
                text: CancelReservation.message,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'green',
            });
            getReservation();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Modification du Reservation',
                text: error.message,
                confirmButtonText: 'Réssayer',
                confirmButtonColor: 'red',
            })
        }
    }

    const handleNextPage = () => {
        if (current_page < last_page) {
            setCurrentPage(current_page + 1)
        }
    };

    const handlePreviousPage = () => {
        if (current_page > 1) {
            setCurrentPage(current_page - 1);
        }
    };
    
    const handleCancelReservation = async (reservation) => {
        
        try {
            if (reservation.status_Res != 'En Attente') {
                throw new Error("Vous n'avait annuler un reservation n'est pas en attente");
            }
            const CancelReservation = await deleteReservation(token, reservation);
            Swal.fire({
                icon: 'success',
                title: 'Annulation de Reservation',
                text: CancelReservation.message,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'green',
            });
            getReservation();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Annulation de Reservation',
                text: error.message,
                confirmButtonText: 'Réssayer',
                confirmButtonColor: 'red',
            })
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-[550px]">
            <h1 className="text-3xl font-bold text-[#8B4513] mt-6 mb-4 text-center">Mes Réservations</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3 col-span-full">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (reservations && reservations?.data?.length > 0) ? (
                        reservations?.data.map(reservation => (
                            <ReservationCard 
                                key={reservation.id} 
                                reservation={reservation}
                                handleCancel={handleCancelReservation}
                                handleProlongement={handleProlongement}
                            />
                        ))
                        
                    
                ) : (
                    <p className="text-[#8B4513] text-center col-span-full">{message}</p>
                )}
            </div>
                {(reservations && reservations?.data?.length > 0) && (
                    <PaginationGrad
                        currentPage={current_page}
                        totalPages={last_page}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                    />
                )}
        </div>
    );
}

export default MesReservations;