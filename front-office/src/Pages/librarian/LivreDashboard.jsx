import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import { deleteLivre, fetchLivre } from "../../services/LivreService";
import loadingSwal from "../../utils/loadingSwal";
import LivreList from "../../components/librarian/livre/LivreList";
import SearchInput from "../../components/buttons/SearchInput";
import { fetchCategories } from "../../services/categorieService";
import { SelecteFilter, SelecteFilterId } from "../../components/filtrage/selecteFiltrage";
import PaginationGrad from "../../components/pagination/paginationGrid";
import AddButton from "../../components/buttons/AddButton";
import LivrePopup from "../../components/dashboard/LivrePopup";
import { fetchTags } from "../../services/tagService";

const LivreDashboard = () => {
  const { token } = useToken();
  const [livres, setLivres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [categories, setCategories] = useState([]);
  const [categorieId, setCategorieId] = useState("");
  const [disponibilite, setDisponibilite] = useState("");
  const [status_livre, setStatusLivre] = useState("");
  const [current_page, setCurrentPage] = useState(1);
  const [last_page, setLastPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [livreToEdit, setLivreToEdit] = useState(null);

  useEffect(() => {
    const fetchCate = async () => {
      setIsLoading(true);
      try {
        const dataFetch = await fetchCategories();
        setCategories(dataFetch.categories);
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Erreur de récupération des catégories",
          text: error.message,
          confirmButtonText: "Réessayer",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getTags = async () => {
      setIsLoading(true);
      try {
        const dataFetch = await fetchTags();
        setTags(dataFetch.tags);
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Erreur de récupération des tags",
          text: error.message,
          confirmButtonText: "Réessayer",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCate();
    getTags();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal("Récupération Livres");

    try {
      const dataFetch = await fetchLivre(
        token,
        searchItem,
        categorieId,
        "",
        disponibilite,
        9,
        current_page,
        status_livre
      );
      setLivres(dataFetch?.data?.data || []);
      setCurrentPage(dataFetch?.data?.current_page);
      setLastPage(dataFetch?.data?.last_page);
      setMessage(dataFetch.message);
      loadingSwal().close();
    } catch (error) {
      loadingSwal().close();
      await Swal.fire({
        icon: "error",
        title: "Erreur de récupération des livres",
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
  }, [token, searchItem, categorieId, status_livre, disponibilite, current_page]);

  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Opération réussie",
      text: "Le livre a été ajouté ou modifié avec succès.",
      color: "green",
      showConfirmButton: false,
      timer: 1300,
      timerProgressBar: true,
    }).then(() => {
      setShowModal(false);
      setLivreToEdit(null);
      fetchData();
    });
  };

  const handleEdit = (livre) => {
    setLivreToEdit(livre);
    setShowModal(true);
  };

  const handleDelete = async (livre) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Confirmer la suppression",
      text: `Voulez-vous vraiment supprimer le livre "${livre.title}" ?`,
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await deleteLivre( token, livre.id)
        handleSuccess();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur de suppression",
          text: error.message,
          confirmButtonText: "Réessayer",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const handleAddClick = async () => {
    const result = await Swal.fire({
      icon: "info",
      title: "Ajouter Livre",
      text: "Vous êtes sur le point de créer un nouveau livre. Procéder ?",
      showCancelButton: true,
      confirmButtonText: "Oui, Procéder",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      setLivreToEdit(null);
      setShowModal(true);
    }
  };

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

  return (
    <div className="relative w-full flex flex-col items-center md:items-start">
      <TitlePage title="Gestion des Livres" description="Créez et gérez les livres" />

      {showModal && (
        <LivrePopup
          show={showModal}
          onClose={() => setShowModal(false)}
          initialData={livreToEdit}
          categories={categories}
          isEditMode={!!livreToEdit}
          tags={tags}
          onSuccess={handleSuccess}
        />
      )}
      <div className="w-full py-4 md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
          <SearchInput setSearchItem={setSearchItem} />
          <SelecteFilterId
            title={"🗃️ Toutes les catégories"}
            valueInisial={categorieId}
            values={categories}
            handleAction={setCategorieId}
          />
          <SelecteFilter
            title="📌 Disponibilité"
            valueInisial={disponibilite}
            values={["Disponible", "Rupture de stock", "Indisponible"]}
            handleAction={setDisponibilite}
          />
          <SelecteFilter
            title="📌 Statut"
            valueInisial={status_livre}
            values={["En Attente", "Accepter", "Refuser"]}
            handleAction={setStatusLivre}
          />
          <AddButton title="Ajouter Livre" handleAddClick={handleAddClick} />
        </div>

        <div className="flex-1 mt-4 w-full min-h-[470px] scrollbar-hide overflow-auto flex flex-col">
          {isLoading ? (
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-amber-700">Chargement...</span>
            </div>
          ) : (
            <LivreList
              livres={livres}
              message={message}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
        {livres && livres.length > 0 && (
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

export default LivreDashboard;