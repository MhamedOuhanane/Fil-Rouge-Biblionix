import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
// import loadingSwal from "../../utils/loadingSwal";
import { fetchTransactions } from "../../services/transactionService";
import Swal from "sweetalert2";
import TransactionList from "../../components/admin/transaction/TransactionList";
import SelecteFilter from "../../components/filtrage/selecteFiltrage";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import { SpinnerLoadingIcon } from "../../Icons/Icons";

const TransactionPage = () => {
  const { token } = useToken();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    // loadingSwal("Récupération des transactions");

    try {
      const dataFetch = await fetchTransactions(
        token,
        statusFilter,
        page
      );
      setTransactions(dataFetch.transactions || []);
      setMessage(dataFetch.message || "");
      setCurrentPage(dataFetch.current_page || 1);
      setTotalPages(dataFetch.total_pages || 1);
    //   loadingSwal().close();
    } catch (error) {
    //   loadingSwal().close();
        Swal.fire({
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
    fetchData(currentPage);
  }, [token, statusFilter, currentPage]);
  

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center md:items-start">
      <TitlePage
        title="Gestion des Transactions"
        description="Gérez les transactions du site"
      />

      <div className="w-full py-4 md:px-6 space-y-4 max-h-screen overflow-y-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-center md:flex-row md:justify-between gap-4 md:px-4 text-sm md:text-lg">
          <div className="w-full flex justify-center md:justify-end space-x-4">
            <SelecteFilter
              title="Tous les Statuts"
              valueInisial={statusFilter}
              values={["APPROVAL_PENDING", "PPROVED", "ACTIVE", "SUSPENDED", "CANCELLED", "EXPIRED"]}
              handleAction={setStatusFilter}
              className="text-sm"
            />
          </div>
        </div>
        <div className="flex w-full justify-between items-center mb-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px] w-full space-x-2 mt-3">
              <SpinnerLoadingIcon />  
              <span className="text-amber-700">Chargement...</span>
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              message={message}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;