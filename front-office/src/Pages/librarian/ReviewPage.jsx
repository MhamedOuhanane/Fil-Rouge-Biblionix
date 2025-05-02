import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import { fetchRevies } from "../../services/reviewService";
import ReviewList from "../../components/librarian/ReviewList";
import PaginationGrad from "../../components/pagination/paginationGrid";
import { SelecteFilter, SelectTime } from "../../components/filtrage/selecteFiltrage";

const ReviewPage = () => {
  const { token } = useToken();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [current_page, setCurrentPage] = useState(1);
  const [last_page, setLastPage] = useState(1);
  const [review_On, setReviewOn] = useState('');
  const [review_By, setReviewBy] = useState('');
  const [created_at, setCreatedAt] = useState('');
  
  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal("Récupération des Avis");

    try {
      const dataFetch = await fetchRevies(token, review_On, review_By, created_at, current_page);
      setReviews(dataFetch?.Reviews?.data || []);
      setMessage(dataFetch.message);
      setLastPage(dataFetch?.Reviews?.last_page);
      setCurrentPage(dataFetch?.Reviews?.current_page);
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
  }, [token, current_page, review_On, review_By, created_at]);

  const handlePreviousPage = () => {
    if (current_page > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (current_page < last_page) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  console.log(created_at, review_By, review_On);
  

  return (
    <div className="w-full flex flex-col items-center md:items-start">
        <TitlePage title="Gestion des Avis" description="Créez et gérez vos avis" />

        <div className="w-full py-4 md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
              <SelecteFilter 
                  title='🖋️ Avis par' 
                  valueInisial={review_By} 
                  values={['App\\Models\\Auteur', 'App\\Models\\Lecteur']}
                  handleAction={setReviewBy}
              />
              <SelecteFilter 
                  title='🗂️ Avis sur' 
                  valueInisial={review_By} 
                  values={['App\\Models\\Auteur', 'App\\Models\\Livre']}
                  handleAction={setReviewOn}
              />
              <SelectTime 
                  valueInisial={created_at}
                  handleAction={setCreatedAt}
              />
            </div>
            <div className="flex-1 mt-4 w-full flex flex-col items-center">
                {isLoading ? (
                <div className="flex items-center space-x-2 mt-3">
                    <span className="text-amber-700">Chargement...</span>
                </div>
                ) : (
                <>
                  <ReviewList
                      reviews={reviews}
                      message={message}
                  />
                  <PaginationGrad
                    currentPage={current_page}
                    totalPages={last_page}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                  />
                </> 
                )}
            </div>
        </div>
    </div>
  );
};

export default ReviewPage;