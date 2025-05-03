import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import { fetchReservation, updateStatusReservation } from "../../services/reservationService";
import ReservationList from "../../components/librarian/ReservationList";
import PaginationGrad from "../../components/pagination/paginationGrid";
import { SelecteFilter } from "../../components/filtrage/selecteFiltrage";

const ReservationDashboard = () => {
  const { token } = useToken();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [current_page, setCurrentPage] = useState(1);
  const [last_page, setLastPage] = useState(1);
  const [filterStatusRes, setFilterStatusRes] = useState("");
  const [filterStatusPro, setFilterStatusPro] = useState("");
  
    const fetchData = async () => {
        setIsLoading(true);
        loadingSwal("Récupération des Avis");

        try {
            const dataFetch = await fetchReservation(token, current_page, filterStatusRes, filterStatusPro);
            setReservations(dataFetch?.data?.data || []);
            setCurrentPage(dataFetch?.data?.current_page);
            setLastPage(dataFetch?.data?.last_page);
            setMessage(dataFetch.message);
            loadingSwal().close();
        } catch (error) {
        loadingSwal().close();
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
    };
  

    useEffect(() => {
        fetchData();
    }, [token, current_page, filterStatusRes, filterStatusPro]);

    const handleActionReservation = async (element, statusR, returned_at = null) => {
        try {
            const formData = {
                status_Res: statusR,
                returned_at: returned_at,
            }
            const data = await updateStatusReservation(token, element, formData);
            Swal.fire({
                icon: 'success',
                title: 'Action Status',
                text: data.message,
                showCancelButton: false,
                timer: 1200,
                timerProgressBar: true,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Action Status',
                text: error.message,
                confirmButtonText: 'Ok',
                timer: 3000,
                timerProgressBar: true,
            });
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


  

  return (
    <div className="w-full flex flex-col items-center md:items-start">
        <TitlePage title="Gestion des Réservation" description="Voir et gérez les réservations" />

        <div className="w-full py-4 md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                <SelecteFilter
                    title="📌 Status Réservation"
                    valueInisial={filterStatusRes}
                    values={['En Attente', 'Accepter', 'Refuser','En Cours', 'Terminer']}
                    handleAction={setFilterStatusRes}
                />
                <SelecteFilter
                    title="📌 Status Prolongement"
                    valueInisial={filterStatusPro}
                    values={['Pas de Pro', 'En Attente', 'Accepter', 'Refuser','En Cours', 'Terminer']}
                    handleAction={setFilterStatusPro}
                />
            </div>
            <div className="flex-1 mt-4 w-full flex flex-col items-center min-h-[470px]">
                {isLoading ? (
                <div className="flex items-center space-x-2 mt-3">
                    <span className="text-amber-700">Chargement...</span>
                </div>
                ) : (
                <>
                    <ReservationList
                        reservations={reservations}
                        message={message}
                        handleActionReservation={handleActionReservation}
                    />
                </> 
                )}
            </div>
                {(reservations && reservations.length > 0) && (
                    <PaginationGrad
                        currentPage={current_page}
                        totalPages={last_page}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                    />
                )}
        </div>
    </div>
  );
};

export default ReservationDashboard;