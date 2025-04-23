import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { fetchTags } from "../../services/tagService";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import TagList from "../../components/admin/tags/TagList";
import SearchInput from "../../components/buttons/SearchInput";
import AddButton from "../../components/buttons/AddButton";

const TagPage = () => {
  const { token } = useToken();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchItem, setSearchItem] = useState('');

  
  useEffect(() => {
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
    fetchData();
  }, [token, searchItem]);
  console.log(message);
  
  

  return (
    <div className="w-full flex flex-col items-center md:items-start">
        <TitlePage 
            title="Gestion des Tags" 
            description="Créez et gérez vos tags pour organiser votre contenu"
        />


        <div className="w-full py-4  md:px-6 max-h-screen overflow-y-auto flex flex-col items-center">
            <div className="flex w-full justify-between items-center">
                <div className="w-full max-w-xs">
                    <SearchInput setSearchItem={setSearchItem} />
                </div>
            </div>
            <div className="flex-1 mt-4 w-full max-h-[60vh] scrollbar-hide overflow-auto flex justify-center">
                {isLoading ? (
                    <div className="flex items-center space-x-2 mt-3">
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (
                    <TagList
                        tags={tags}
                        message={message}
                    />
                )}
            </div>
        </div>
    </div>
  );
};

export default TagPage;