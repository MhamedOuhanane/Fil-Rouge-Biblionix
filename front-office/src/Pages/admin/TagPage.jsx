import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { deleteTag, fetchTags } from "../../services/tagService";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import TagList from "../../components/admin/tags/TagList";
import SearchInput from "../../components/buttons/SearchInput";
import AddButton from "../../components/buttons/AddButton";
import TagForm from "../../components/admin/tags/TagForm";
import { SpinnerLoadingIcon } from "../../Icons/Icons";

const TagPage = () => {
  const { token } = useToken();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchItem, setSearchItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tagToEdit, setTagToEdit] = useState(false);

  
  const fetchData = async () => {
      setIsLoading(true);
      loadingSwal("Récupération Tags");

      try {
          const dataFetch = await fetchTags(token, searchItem);
          setTags(dataFetch.tags);
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
  }, [token, searchItem]);

  const handleSuccess = () => {
    fetchData();
    setTagToEdit(null);
  };

  const handleEdit = (tag) => {
    setTagToEdit(tag);
    setShowModal(true);
  };
  
  const handleAddClick = async () => {
    const result = await Swal.fire({
        icon: "info",
        title: "Ajouter Tags",
        text: "Vous êtes sur le point de créer des nouveaux tags. Procéder?",
        showCancelButton: true,
        confirmButtonText: "Oui, Procéder",
        cancelButtonText: "Annuler",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
        setTagToEdit(null);
        setShowModal(true);
    }
  }

    const handleDelete = async (tag) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Êtes-vous sûr ?",
            text: `Vous êtes sur le point de supprimer le tag "${tag.name}". Cette action est irréversible.`,
            showCancelButton: true,
            confirmButtonText: "Oui, Supprimer",
            cancelButtonText: "Annuler",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
        try {
            await deleteTag(token, tag.id);
            await Swal.fire({
                icon: "success",
                title: "Tag Supprimé",
                text: `Le tag "${tag.name}" a été supprimé avec succès.`,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            fetchData();
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Erreur",
                text: error.message,
                confirmButtonText: "Réessayer",
                confirmButtonColor: "#d33",
            });
        }
        }
    };
  
  

  return (
    <div className="w-full flex flex-col items-center md:items-start">
        <TitlePage 
            title="Gestion des Tags" 
            description="Créez et gérez vos tags pour organiser votre contenu"
        />


        <div className="w-full py-4  md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">
            {showModal ? (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full md:w-[60%] mx-auto my-6">
                    <h2 className="text-lg font-semibold text-center text-custom-brown mb-4">
                    {tagToEdit ? "Modifier le Tag" : "Créer un Nouveau Tag"}
                    </h2>
                    <TagForm
                        setShowModal={setShowModal}
                        tagToEdit={tagToEdit}
                        onSuccess={handleSuccess}
                    />
                </div>
            ) : (
                <>
                    <div className="flex w-full justify-between items-center">
                        <div className="w-full max-w-xs">
                            <SearchInput setSearchItem={setSearchItem} searchItem={searchItem} />
                        </div>
                        <AddButton title="Ajouter Tags" handleAddClick={handleAddClick}/>
                    </div>
                    <div className="flex-1 mt-4 w-full max-h-[60vh] scrollbar-hide overflow-auto flex justify-center">
                        {isLoading ? (
                            <div className="flex items-center space-x-2 mt-3">
                                <SpinnerLoadingIcon />
                                <span className="text-amber-700">Chargement...</span>
                            </div>
                        ) : (
                            <TagList
                                tags={tags}
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

export default TagPage;