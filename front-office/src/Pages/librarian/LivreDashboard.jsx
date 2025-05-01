import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import { fetchLivre } from "../../services/LivreService";
import loadingSwal from "../../utils/loadingSwal";
import LivreList from "../../components/librarian/livre/LivreList";

const LivreDashboard = () => {
  const { token } = useToken();
  const [livres, setLivres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal("Récupération Livres");

    try {
      const dataFetch = await fetchLivre(token, "", "", "", "", 9, 1, "");
      setLivres(dataFetch?.data?.data || []);
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
  }, [token]);


  return (
    <div className="w-full flex flex-col items-center md:items-start">
      <TitlePage title="Gestion des Livres" description="Créez et gérez les livres" />

      <div className="w-full py-4 md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">

        <div className="flex-1 mt-4 w-full max-h-[570px] scrollbar-hide overflow-auto flex justify-center">
            {isLoading ? (
            <div className="flex items-center space-x-2 mt-3">
                <span className="text-amber-700">Chargement...</span>
            </div>
            ) : (
            <LivreList
                livres={livres}
                message={message}
            />
            )}
        </div>
      </div>
    </div>
  );
};

export default LivreDashboard;