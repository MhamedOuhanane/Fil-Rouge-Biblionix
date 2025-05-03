import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import { fetchReservation } from "../../services/reservationService";
import ReservationList from "../../components/librarian/ReservationList";
import PaginationGrad from "../../components/pagination/paginationGrid";

const ReservationDashboard = () => {
  const { token } = useToken();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [current_page, setCurrentPage] = useState(1);
  const [last_page, setLastPage] = useState(1);
  
  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal("Récupération des Avis");

    try {
      const dataFetch = await fetchReservation(token, current_page);
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
  }, [token, current_page]);

  

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