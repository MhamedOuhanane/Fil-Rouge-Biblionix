import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import CategorieList from "../../components/admin/categories/CategorieList";
import { loadingSwal } from "../../utils/loadingSwal";
import { deleteCategorie, fetchCategories } from "../../services/categorieService";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import SearchInput from "../../components/buttons/SearchInput";
import AddButton from "../../components/buttons/AddButton";
import CategorieForm from "../../components/admin/categories/CategorieForm";

const CategoriePage = () => {
  const { token } = useToken();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categorieToEdit, setCategorieToEdit] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal("Récupération Catégories");

    try {
      const dataFetch = await fetchCategories(token, searchItem);
      setCategories(dataFetch.categories);
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
  }, [searchItem, showModal, token]);

  const handleEdit = (categorie) => {
    setCategorieToEdit(categorie);
    setShowModal(true);
  };

  const handleSuccess = () => {
    fetchData();
    setCategorieToEdit(null);
  };

  const handleAddClick = async () => {
    const result = await Swal.fire({
      icon: "info",
      title: "Ajouter Categorie",
      text: "Vous êtes sur le point de créer une nouvelle categorie. Procéder?",
      showCancelButton: true,
      confirmButtonText: "Oui, Procéder",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      setCategorieToEdit(null);
      setShowModal(true);
    }
  };

  

  const handleDelete = async (categorie) => {
    try {
      await deleteCategorie(token, categorie.id);
      await Swal.fire({
        icon: "success",
        title: "Catégorie supprimée",
        text: `La catégorie ${categorie.title} a été supprimée avec succès.`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      fetchData();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonText: "Retry",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
        <div className="w-full flex flex-col items-center md:items-start">
            <TitlePage title="Géstion Des Catégories" description="Créez et gérez vos catégories" />

            <div className="w-full py-4  md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">
                {showModal ? (
                <div className="bg-[#FCE3C9] p-6 rounded-lg shadow-lg w-full md:w-[60%]">
                    <h2 className="text-lg font-semibold text-center text-amber-900 mb-4">
                        {categorieToEdit ? "Modifier Category" : "Create Category"}
                    </h2>
                    <CategorieForm
                    setShowModal={setShowModal}
                    categorieToEdit={categorieToEdit}
                    onSuccess={handleSuccess}
                    />
                </div>
                ) : (
                <>
                    <div className="flex w-full justify-between items-center">
                        <div className="w-full max-w-xs">
                            <SearchInput setSearchItem={setSearchItem} />
                        </div>
                        <AddButton title="Ajouter Catégorie" handleAddClick={handleAddClick} />
                    </div>

                    <div className="flex-1 mt-4 w-full max-h-[60vh] scrollbar-hide overflow-auto flex justify-center">
                        {isLoading ? (
                            <div className="flex items-center space-x-2 mt-3">
                                <span className="text-amber-700">Chargement...</span>
                            </div>
                        ) : (
                            <CategorieList
                                categories={categories}
                                message={message}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default CategoriePage;